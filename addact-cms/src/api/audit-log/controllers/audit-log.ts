import { factories } from '@strapi/strapi';
import jwt from 'jsonwebtoken';
import { parseUserAgent } from '../../../utils/user-agent';
import { getLocationFromIp, SERVER_SYSTEM_USER, sanitizeClientId } from '../../../utils/location';

async function getAdminUser(ctx: any, strapi: any): Promise<any> {
  let user = ctx.state?.user;

  const authHeader =
    ctx.headers?.authorization ||
    ctx.header?.authorization ||
    ctx.request?.headers?.authorization ||
    ctx.request?.header?.authorization;
  if (!user && authHeader) {
    try {
      const token = authHeader.replace(/^Bearer\s+/i, '').trim();
      if (token) {
        let userId: any = null;

        // 1. Validate using Strapi's supported admin token service
        try {
          const tokenService = (strapi as any).service('admin::token');
          if (tokenService && typeof tokenService.decodeJwtToken === 'function') {
            const decoded = tokenService.decodeJwtToken(token);
            if (decoded && decoded.isValid && decoded.payload) {
              userId = decoded.payload.id || decoded.payload.userId;
            }
          }
        } catch (e) {}

        // 2. Validate using jwt.verify with admin secret
        if (!userId) {
          try {
            const jwtSecret = (strapi.config.get('admin.auth.secret') || process.env.ADMIN_JWT_SECRET) as string;
            if (jwtSecret) {
              const verifiedPayload: any = jwt.verify(token, jwtSecret);
              if (verifiedPayload) userId = verifiedPayload.id || verifiedPayload.userId;
            }
          } catch (e) {
            // Reject invalid or expired token
          }
        }

        if (userId) {
            try {
              const adminUserService = (strapi as any).service('admin::user');
              if (adminUserService && typeof adminUserService.findOne === 'function') {
                user = await adminUserService.findOne(userId, ['roles']);
              }
            } catch (e) {}

            if (!user) {
              user = await (strapi.db.query('admin::user' as any) as any).findOne({
                where: { id: userId },
                populate: ['roles'],
              });
            }
          }
        }
      } catch (err) {
        strapi.log.error('AuditLog Controller: getAdminUser error:', err);
      }
    }

  if (user && user.id) {
    try {
      const roles = await (strapi.db.query('admin::role' as any) as any).findMany({
        where: { users: { id: user.id } },
      });
      if (roles && roles.length > 0) {
        user.roles = roles;
      }
    } catch (e) {}
  }

  return user;
}

function isAdminOrSuperAdmin(user: any): boolean {
  if (!user) return false;

  const roles = user.roles || [];
  if (Array.isArray(roles) && roles.length > 0) {
    const hasAllowedRole = roles.some((r: any) => {
      const code = String(r.code || '').toLowerCase();
      const name = String(r.name || '').toLowerCase();
      return (
        code === 'strapi-super-admin' ||
        code === 'super-admin' ||
        code === 'admin' ||
        code === 'administrator' ||
        name.includes('super admin') ||
        name === 'admin' ||
        name === 'administrator'
      );
    });
    if (hasAllowedRole) return true;
  }

  const userRoleCode = String(user.role?.code || user.role || '').toLowerCase();
  const userRoleName = String(user.role?.name || '').toLowerCase();
  if (
    userRoleCode === 'strapi-super-admin' ||
    userRoleCode === 'super-admin' ||
    userRoleCode === 'admin' ||
    userRoleCode === 'administrator' ||
    userRoleName.includes('super admin') ||
    userRoleName === 'admin' ||
    userRoleName === 'administrator'
  ) {
    return true;
  }

  return false;
}

export default factories.createCoreController('api::audit-log.audit-log' as any, ({ strapi }) => ({
  async findLogs(ctx: any) {
    try {
      const user = await getAdminUser(ctx, strapi);
      if (!isAdminOrSuperAdmin(user)) {
        return ctx.forbidden('Access Denied: Audit Logs are only accessible to Super Admin and Admin users.');
      }

      const service = strapi.service('api::audit-log.audit-log' as any) as any;
      const result = await service.findLogs(ctx.query);
      return ctx.send(result);
    } catch (err: any) {
      strapi.log.error('AuditLog Controller findLogs error:', err);
      return ctx.badRequest(err?.message || 'Failed to fetch audit logs', { error: err });
    }
  },

  async getContentTypes(ctx: any) {
    try {
      const user = await getAdminUser(ctx, strapi);
      if (!isAdminOrSuperAdmin(user)) {
        return ctx.forbidden('Access Denied: Audit Logs are only accessible to Super Admin and Admin users.');
      }

      const service = strapi.service('api::audit-log.audit-log' as any) as any;
      const types = await service.getDistinctContentTypes();
      return ctx.send({ data: types });
    } catch (err) {
      strapi.log.error('AuditLog Controller getContentTypes error:', err);
      return ctx.badRequest('Failed to fetch content types', { error: err });
    }
  },

  async exportLogs(ctx: any) {
    try {
      const user = await getAdminUser(ctx, strapi);
      if (!isAdminOrSuperAdmin(user)) {
        return ctx.forbidden('Access Denied: Audit Logs are only accessible to Super Admin and Admin users.');
      }

      const service = strapi.service('api::audit-log.audit-log' as any) as any;
      const result = await service.exportLogs(ctx.query);

      ctx.set('Content-Type', 'application/json');
      ctx.set('Content-Disposition', `attachment; filename=cms-audit-logs-${new Date().toISOString().slice(0, 10)}.json`);
      if (result.pagination) {
        ctx.set('X-Total-Count', String(result.pagination.total));
        ctx.set('X-Export-Page', String(result.pagination.page));
        ctx.set('X-Export-PageSize', String(result.pagination.pageSize));
        if (result.pagination.isTruncated) {
          ctx.set('X-Export-Truncated', 'true');
          ctx.set('X-Export-Warning', String(result.pagination.warning));
        }
      }
      return ctx.send(JSON.stringify(result, null, 2));
    } catch (err) {
      strapi.log.error('AuditLog Controller exportLogs error:', err);
      return ctx.badRequest('Failed to export audit logs', { error: err });
    }
  },

  // Manual deletion is intentionally disabled in favor of automated 30-day retention policy
  async deleteLog(ctx: any) {
    return ctx.badRequest('Manual deletion of audit logs is disabled. Logs are automatically retained and purged after 30 days for compliance and security.');
  },

  async deleteAllLogs(ctx: any) {
    return ctx.badRequest('Manual purge of audit logs is disabled. Logs are automatically retained and purged after 30 days for compliance and security.');
  },
}));
