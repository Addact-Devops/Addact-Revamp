import { Core } from '@strapi/strapi';
import speakeasy from 'speakeasy';
import jwt from 'jsonwebtoken';
import { parseUserAgent } from './utils/user-agent';
import { getLocationFromIp, SERVER_SYSTEM_USER, sanitizeClientId } from './utils/location';
import * as os from 'os';
import * as http from 'http';
import * as https from 'https';

const IGNORED_KEYS = new Set([
  'id',
  'documentId',
  'createdAt',
  'updatedAt',
  'publishedAt',
  'createdBy',
  'updatedBy',
  'publishedBy',
  'locale',
  'localizations',
  'status',
  '__temp_key__',
  'v',
  // Media internal fields
  'folder',
  'related',
  'formats',
  'provider',
  'provider_metadata',
  'url',
  'hash',
  'ext',
  'mime',
  'size',
  'sizeInBytes',
  'width',
  'height',
  'path',
]);

function getEntityIds(val: any): string[] {
  if (val === null || val === undefined) return [];
  if (typeof val === 'number' || typeof val === 'string') return [String(val)];
  if (Array.isArray(val)) {
    const ids: string[] = [];
    for (const item of val) {
      ids.push(...getEntityIds(item));
    }
    return ids;
  }
  if (typeof val === 'object') {
    if (val.id != null) return [String(val.id)];
    if ('connect' in val && Array.isArray(val.connect)) return getEntityIds(val.connect);
  }
  return [];
}

function isRelationOrMedia(val: any): boolean {
  if (!val || typeof val !== 'object' || Array.isArray(val)) return false;
  if ('__component' in val) return false;
  if ('url' in val || 'mime' in val || 'provider' in val || 'formats' in val || 'folder' in val || 'related' in val) {
    return true;
  }
  return false;
}

function isRelationPayload(val: any): boolean {
  if (val === null || val === undefined) return false;
  if (typeof val === 'number' || typeof val === 'string') return true;
  if (Array.isArray(val) && val.every(x => typeof x === 'number' || typeof x === 'string')) return true;

  if (typeof val === 'object') {
    if ('connect' in val || 'disconnect' in val) return true;
    if (isRelationOrMedia(val)) return true;

    const keys = Object.keys(val).filter(k => !['id', 'documentId', '__temp_key__'].includes(k));
    if ('id' in val && keys.length === 0) return true;
  }

  return false;
}

function isBlank(val: any): boolean {
  if (val === '' || val === null || val === undefined) return true;
  if (Array.isArray(val) && val.length === 0) return true;
  if (typeof val === 'object' && val !== null && !('connect' in val) && !('disconnect' in val) && Object.keys(val).length === 0) return true;
  return false;
}

function getDeepPopulate(uid: string, depth = 3): any {
  if (depth <= 0) return '*';
  try {
    const model = (strapi as any).getModel(uid);
    if (!model || !model.attributes) return '*';

    const populateObj: any = {};
    for (const [key, attr] of Object.entries<any>(model.attributes)) {
      if (attr.type === 'component') {
        populateObj[key] = {
          populate: getDeepPopulate(attr.component, depth - 1),
        };
      } else if (attr.type === 'dynamiczone') {
        populateObj[key] = {
          populate: '*',
        };
      } else if (attr.type === 'relation' || attr.type === 'media') {
        populateObj[key] = {
          populate: '*',
        };
      }
    }
    return Object.keys(populateObj).length > 0 ? populateObj : '*';
  } catch (e) {
    return '*';
  }
}

function diffValue(newVal: any, oldVal: any, path: string): string[] {
  if (newVal === oldVal) return [];

  // 1. Handle Relation Connect/Disconnect payloads
  if (typeof newVal === 'object' && newVal !== null && ('connect' in newVal || 'disconnect' in newVal)) {
    const disconnectIds = getEntityIds(newVal.disconnect);
    if (disconnectIds.length > 0) return [path];

    const connectIds = getEntityIds(newVal.connect);
    if (connectIds.length === 0) return []; // Empty relation payload ({ connect: [], disconnect: [] }) -> No change!

    const oldIds = getEntityIds(oldVal);
    const hasNewConnect = connectIds.some(id => !oldIds.includes(id));
    return hasNewConnect ? [path] : [];
  }

  // 2. Handle empty vs empty
  if (isBlank(newVal) && isBlank(oldVal)) return [];

  // 3. Handle Media / Relation object or ID comparison
  const isNewRel = isRelationPayload(newVal);
  const isOldRel = isRelationPayload(oldVal);

  if (isNewRel || isOldRel) {
    const newIds = getEntityIds(newVal);
    const oldIds = getEntityIds(oldVal);
    if (newIds.length === oldIds.length && newIds.every((id, idx) => id === oldIds[idx])) {
      return [];
    }
    if (newIds.length === oldIds.length && newIds.every(id => oldIds.includes(id))) {
      return [];
    }
    return [path];
  }

  // 4. Handle Arrays (Dynamic zones & Repeatable components)
  if (Array.isArray(newVal) || Array.isArray(oldVal)) {
    const nArr = Array.isArray(newVal) ? newVal : [];
    const oArr = Array.isArray(oldVal) ? oldVal : [];

    if (nArr.length !== oArr.length) {
      return [`${path} (Item Count Changed: ${oArr.length} -> ${nArr.length})`];
    }

    const changes: string[] = [];
    for (let i = 0; i < nArr.length; i++) {
      const subPath = `${path}.${i}`;
      changes.push(...diffValue(nArr[i], oArr[i], subPath));
    }
    return changes;
  }

  // 5. Handle Objects (Components)
  if (typeof newVal === 'object' && newVal !== null && typeof oldVal === 'object' && oldVal !== null) {
    const allKeys = new Set([...Object.keys(newVal), ...Object.keys(oldVal)]);
    const changes: string[] = [];
    for (const key of allKeys) {
      if (IGNORED_KEYS.has(key) || key.startsWith('__')) continue;
      const subPath = path ? `${path}.${key}` : key;
      changes.push(...diffValue(newVal[key], oldVal[key], subPath));
    }
    return changes;
  }

  // 6. Handle Primitive values (string, number, boolean)
  if (String(newVal ?? '') !== String(oldVal ?? '')) {
    return [path];
  }

  return [];
}



function getDocumentDisplayTitle(entry: any): string | null {
  if (!entry || typeof entry !== 'object') return null;

  const candidates = [
    entry.ReferenceTitle,
    entry.title,
    entry.Title,
    entry.name,
    entry.Name,
    entry.heading,
    entry.Heading,
    entry.pageTitle,
    entry.PageTitle,
    entry.slug,
    entry.Slug,
    entry.metaTitle,
    entry.SEO?.metaTitle,
    entry.SEO?.ogTitle,
    entry.HeadingSection?.[0]?.PageTitle,
    entry.BlogBanner?.[0]?.BannerTitle,
  ];

  for (const cand of candidates) {
    if (cand && typeof cand === 'string' && cand.trim().length > 0) {
      const trimmed = cand.trim();
      return trimmed.length > 40 ? `${trimmed.substring(0, 40)}...` : trimmed;
    }
  }

  return null;
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const auditService = strapi.service('api::audit-log.audit-log' as any) as any;

    // Ensure test admin user exists for local testing (fail-safe)
    try {
      const existingUser = await (strapi.db.query('admin::user' as any) as any).findOne({
        where: { email: 'dev@local.com' },
      });

      if (!existingUser) {
        const adminUserService = strapi.service('admin::user' as any) as any;
        const adminRoleService = strapi.service('admin::role' as any) as any;

        if (adminUserService && adminRoleService) {
          let devRole = await (strapi.db.query('admin::role' as any) as any).findOne({
            where: { $or: [{ code: 'developer' }, { name: 'Developer' }] },
          });

          if (!devRole && typeof adminRoleService.getSuperAdmin === 'function') {
            devRole = await adminRoleService.getSuperAdmin();
          }

          if (devRole && typeof adminUserService.hashPassword === 'function' && typeof adminUserService.create === 'function') {
            const hashedPassword = await adminUserService.hashPassword('DevTester123!');
            await adminUserService.create({
              firstname: 'Dev',
              lastname: 'Tester',
              email: 'dev@local.com',
              password: hashedPassword,
              roles: [devRole.id],
              isActive: true,
              registrationToken: null,
            });
            strapi.log.info('AuditLog Bootstrap: Created test admin user dev@local.com / DevTester123!');
          }
        }
      }
    } catch (e) {}

    // 1. Document Service Middleware for High-Level Content Tracking
    strapi.documents.use(async (context, next) => {
      const { uid, action, params } = context;

      // Ignore audit-log itself
      if (uid === 'api::audit-log.audit-log' || uid?.includes('audit-log')) {
        return await next();
      }

      // Ignore non-content types (e.g. components)
      if (!uid.startsWith('api::') && !uid.startsWith('plugin::') && !uid.startsWith('admin::')) {
        return await next();
      }

      // We only care about major actions
      const trackedActions = ['create', 'update', 'delete', 'publish', 'unpublish'];
      if (!trackedActions.includes(action)) {
        return await next();
      }

      // Fetch old data BEFORE the action happens (for updates, deletes, publishes)
      let oldData: any = {};
      const docIdParam = (params as any)?.documentId;
      if (docIdParam && ['update', 'delete', 'publish', 'unpublish'].includes(action)) {
        try {
          oldData = await strapi.documents(uid as any).findOne({
            documentId: docIdParam,
            status: (params as any)?.status || 'draft',
            populate: getDeepPopulate(uid),
          });
        } catch (e) {
          try {
            oldData = await strapi.documents(uid as any).findOne({
              documentId: docIdParam,
            });
          } catch (e2) {}
        }
      }

      // Execute the actual action
      const result = await next();

      // Log after successful execution
      try {
        const koaCtx = strapi.requestContext.get() as any;

        // Deduplicate internal duplicate calls in the same request
        const requestLogKey = `${action}:${uid}:${(params as any)?.documentId || ''}`;
        if (koaCtx?.state?._loggedActions?.has(requestLogKey)) {
          return result;
        }
        if (koaCtx?.state) {
          koaCtx.state._loggedActions = koaCtx.state._loggedActions || new Set();
          koaCtx.state._loggedActions.add(requestLogKey);
        }

        const user = koaCtx?.state?.user;

        let userName = 'System / API';
        let userEmail = 'N/A';

        if (user) {
          const fullName = `${user.firstname || ''} ${user.lastname || ''}`.trim();
          userName = fullName || user.username || user.email || 'Admin User';
          userEmail = user.email || 'N/A';
        }

        const rawClientId = koaCtx?.headers?.['x-client-id'] || koaCtx?.request?.headers?.['x-client-id'];
        const clientId = sanitizeClientId(rawClientId) || undefined;

        const uaString = koaCtx?.headers?.['user-agent'] || '';
        const { browser, os: osName, deviceType } = parseUserAgent(uaString);

        const rawIp = koaCtx?.headers?.['x-forwarded-for'] || koaCtx?.ip || koaCtx?.request?.ip || 'Unknown IP';
        const ipAddress = typeof rawIp === 'string' ? rawIp.split(',')[0].trim() : 'Unknown IP';
        const location = await getLocationFromIp(ipAddress);

        let updatedFields: string[] = [];
        let actionName = action.charAt(0).toUpperCase() + action.slice(1);

        const paramsData = (params as any)?.data;
        if (action === 'update' && paramsData) {
          const rawKeys = Object.keys(paramsData);
          
          for (const key of rawKeys) {
            if (IGNORED_KEYS.has(key) || key.startsWith('__')) continue;
            
            const newVal = paramsData[key];
            if (newVal === undefined) continue;
            const oldVal = oldData?.[key];
            
            const changes = diffValue(newVal, oldVal, key);
            if (changes.length > 0) {
              updatedFields.push(...changes);
            }
          }
          
          if (updatedFields.length === 0) {
            return result; // Don't log if nothing changed
          }
        }

        // 1. Human-readable Content Type (e.g. "AddactBlog (api::addact-blog.addact-blog)")
        let contentTypeDisplay: string = String(uid);
        try {
          const model = (strapi as any).getModel(uid);
          const displayName = model?.info?.displayName || model?.info?.singularName;
          if (displayName) {
            contentTypeDisplay = `${displayName} (${uid})`;
          }
        } catch (e) {}

        // 2. Human-readable Doc ID with Page / Reference Title (e.g. "p4dxs1s3ttzk0sle3civb8ma (How to manage IIS Website...)")
        const rawDocId = (result as any)?.documentId || (params as any)?.documentId || (result as any)?.id?.toString() || (oldData as any)?.documentId;
        let docIdDisplay = rawDocId ? String(rawDocId) : null;
        
        const displayTitle = getDocumentDisplayTitle(result) || getDocumentDisplayTitle(oldData);
        if (docIdDisplay && displayTitle) {
          docIdDisplay = `${docIdDisplay} (${displayTitle})`;
        }

        if (auditService && typeof auditService.createLog === 'function') {
          await auditService.createLog({
            userName,
            userEmail,
            action: actionName,
            contentType: contentTypeDisplay as any,
            targetDocumentId: docIdDisplay ? String(docIdDisplay) : undefined,
            updatedFields,
            ipAddress,
            clientId,
            location,
            browser,
            os: osName,
            deviceType,
            systemUser: SERVER_SYSTEM_USER,
          });
        }
      } catch (err) {
        strapi.log.error('AuditLog Bootstrap: Failed to process document log:', err);
      }

      return result;
    });

    // 2. HTTP Server Middleware for Login, Logout, and 2FA Challenge Interception
    strapi.server.use(async (ctx, next) => {
      const path = ctx.path;
      const method = ctx.method;

      let logoutUser: any = null;
      if (method === 'POST' && (path === '/admin/logout' || path === '/admin/logout/')) {
        logoutUser = ctx.state?.user;
      }

      const isLoginRoute = method === 'POST' && (path === '/admin/login' || path === '/admin/login/');
      const totpHeader = ctx.headers['x-2fa-code'] || ctx.request?.body?.totpCode;

      await next();

      try {
        const rawClientId = ctx.headers['x-client-id'] || ctx.request?.headers?.['x-client-id'];
        const clientId = sanitizeClientId(rawClientId) || undefined;

        const uaString = ctx.headers['user-agent'] || '';
        const { browser, os: osName, deviceType } = parseUserAgent(uaString);
        const rawIp = ctx.headers['x-forwarded-for'] || ctx.ip || 'Unknown IP';
        const ipAddress = typeof rawIp === 'string' ? rawIp.split(',')[0].trim() : 'Unknown IP';
        const location = await getLocationFromIp(ipAddress);

        // Admin Login 2FA Challenge & Audit Log
        if (isLoginRoute && ctx.status === 200 && ctx.body?.data) {
          const user = ctx.body.data.user || ctx.state?.user;
          if (user && user.id) {
            let user2FA = { totpEnabled: false, totpSecret: null as string | null };
            try {
              const { getUser2FA } = await import('./api/audit-log/controllers/admin-2fa');
              user2FA = await getUser2FA(strapi, user.id);
            } catch (e) {}

            if (user2FA.totpEnabled && user2FA.totpSecret) {
              if (!totpHeader) {
                // Password was valid! Create a signed, short-lived (5 min) 2FA challenge token bound strictly to THIS user ID
                const jwtSecret = (strapi.config.get('admin.auth.secret') || process.env.ADMIN_JWT_SECRET || 'strapi-admin-secret') as string;
                const challengeToken = jwt.sign(
                  {
                    userId: user.id,
                    email: user.email,
                    requires2FA: true,
                    type: '2fa_challenge',
                  },
                  jwtSecret,
                  { expiresIn: '5m' }
                );

                ctx.status = 200;
                ctx.body = {
                  data: {
                    requires2FA: true,
                    email: user.email,
                    challengeToken,
                    message: '2-Factor Authentication (TOTP) code required.',
                  },
                };
                return;
              } else {
                // Verify 6-digit TOTP code against THIS USER's stored secret
                const verified = speakeasy.totp.verify({
                  secret: user2FA.totpSecret,
                  encoding: 'base32',
                  token: String(totpHeader).trim(),
                  window: 1, // Standard strict 30-sec window
                });

                if (!verified) {
                  ctx.status = 400;
                  ctx.body = {
                    error: {
                      status: 400,
                      name: 'ValidationError',
                      message: 'Invalid 6-digit 2FA verification code. Access denied.',
                    },
                  };
                  return;
                }
              }
            }

            // If 2FA passed or not enabled, log successful Login
            if (auditService?.createLog) {
              const fullName = `${user.firstname || ''} ${user.lastname || ''}`.trim();
              auditService.createLog({
                userName: fullName || user.username || user.email || 'Admin User',
                userEmail: user.email || 'N/A',
                action: 'Login',
                contentType: 'Admin Auth',
                ipAddress,
                clientId,
                location,
                browser,
                os: osName,
                deviceType,
                systemUser: SERVER_SYSTEM_USER,
              });
            }
          }
        }

        // Admin Logout
        if (method === 'POST' && (path === '/admin/logout' || path === '/admin/logout/') && (ctx.status === 200 || ctx.status === 204)) {
          const user = logoutUser || ctx.state?.user;
          if (user && auditService?.createLog) {
            const fullName = `${user.firstname || ''} ${user.lastname || ''}`.trim();
            auditService.createLog({
              userName: fullName || user.username || user.email || 'Admin User',
              userEmail: user.email || 'N/A',
              action: 'Logout',
              contentType: 'Admin Auth',
              ipAddress,
              clientId,
              location,
              browser,
              os: osName,
              deviceType,
              systemUser: SERVER_SYSTEM_USER,
            });
          }
        }

        // Users-Permissions Auth Login
        if (method === 'POST' && path === '/api/auth/local' && ctx.status === 200) {
          const user = ctx.body?.user;
          if (user && auditService?.createLog) {
            auditService.createLog({
              userName: user.username || user.email || 'User',
              userEmail: user.email || 'N/A',
              action: 'Login',
              contentType: 'Users-Permissions Auth',
              ipAddress,
              clientId,
              location,
              browser,
              os: osName,
              deviceType,
              systemUser: SERVER_SYSTEM_USER,
            });
          }
        }
      } catch (err) {
        strapi.log.error('AuditLog Bootstrap: Failed to process auth log:', err);
      }
    });
  },
};

