import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { parseUserAgent } from '../../../utils/user-agent';
import { getLocationFromIp, SERVER_SYSTEM_USER, sanitizeClientId } from '../../../utils/location';

function generateRecoveryCodes(count = 8): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const hex = crypto.randomBytes(4).toString('hex').toUpperCase();
    codes.push(`${hex.substring(0, 4)}-${hex.substring(4, 8)}`);
  }
  return codes;
}

async function ensure2FATable(strapi: any) {
  try {
    const knex = strapi.db.connection;
    const hasTable = await knex.schema.hasTable('strapi_2fa_secrets');
    if (!hasTable) {
      await knex.schema.createTable('strapi_2fa_secrets', (table: any) => {
        table.string('user_id', 255).primary();
        table.text('totp_secret').nullable();
        table.boolean('totp_enabled').defaultTo(false);
        table.text('recovery_codes').nullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
      strapi.log.info('2FA Controller: Created strapi_2fa_secrets database table.');
    } else {
      const hasColumn = await knex.schema.hasColumn('strapi_2fa_secrets', 'recovery_codes');
      if (!hasColumn) {
        await knex.schema.alterTable('strapi_2fa_secrets', (table: any) => {
          table.text('recovery_codes').nullable();
        });
        strapi.log.info('2FA Controller: Added recovery_codes column to strapi_2fa_secrets table.');
      }
    }
  } catch (err) {
    strapi.log.error('2FA Controller: ensure2FATable error:', err);
  }
}

export async function getUser2FA(strapi: any, userId: number | string) {
  try {
    await ensure2FATable(strapi);
    const knex = strapi.db.connection;
    const row = await knex('strapi_2fa_secrets').where({ user_id: String(userId) }).first();
    if (row) {
      let recoveryCodes: string[] = [];
      if (row.recovery_codes) {
        try {
          recoveryCodes = JSON.parse(row.recovery_codes);
        } catch (e) {}
      }
      return {
        totpSecret: row.totp_secret || null,
        totpEnabled: Boolean(row.totp_enabled),
        recoveryCodes,
      };
    }
  } catch (e) {}

  // Fallback to admin::user record if table lookup yields nothing
  try {
    const dbUser = await (strapi.db.query('admin::user' as any) as any).findOne({
      where: { id: userId },
    });
    if (dbUser) {
      return {
        totpSecret: dbUser.totpSecret || null,
        totpEnabled: Boolean(dbUser.totpEnabled),
        recoveryCodes: [],
      };
    }
  } catch (e) {}

  return { totpSecret: null, totpEnabled: false, recoveryCodes: [] };
}

export async function setUser2FA(
  strapi: any,
  userId: number | string,
  secret: string | null,
  enabled: boolean,
  recoveryCodes?: string[] | null
) {
  try {
    await ensure2FATable(strapi);
    const knex = strapi.db.connection;
    const existing = await knex('strapi_2fa_secrets').where({ user_id: String(userId) }).first();

    const updateData: any = {
      totp_secret: secret,
      totp_enabled: enabled,
      updated_at: knex.fn.now(),
    };

    if (recoveryCodes !== undefined) {
      updateData.recovery_codes = recoveryCodes ? JSON.stringify(recoveryCodes) : null;
    } else if (secret === null) {
      updateData.recovery_codes = null;
    }

    if (existing) {
      await knex('strapi_2fa_secrets').where({ user_id: String(userId) }).update(updateData);
    } else {
      await knex('strapi_2fa_secrets').insert({
        user_id: String(userId),
        ...updateData,
      });
    }
  } catch (e) {
    strapi.log.error('2FA Controller: setUser2FA error:', e);
  }

  // Backup write to admin::user record
  try {
    await (strapi.db.query('admin::user' as any) as any).update({
      where: { id: userId },
      data: {
        totpSecret: secret,
        totpEnabled: enabled,
      },
    });
  } catch (e) {}
}

async function getAdminUser(ctx: any, strapi: any): Promise<any> {
  let user = ctx.state?.user;

  const authHeader = ctx.headers?.authorization || ctx.header?.authorization;
  if (!user && authHeader) {
    try {
      let token = authHeader.replace(/^Bearer\s+/i, '').trim();
      token = token.replace(/^"+|"+$/g, '').trim();

      if (token) {
        let userId: any = null;

        try {
          const tokenService = strapi.service('admin::token');
          if (tokenService && typeof tokenService.decodeJwtToken === 'function') {
            const decoded = tokenService.decodeJwtToken(token);
            if (decoded && decoded.isValid && decoded.payload) {
              userId = decoded.payload.id || decoded.payload.userId;
            }
          }
        } catch (e) {}

        if (!userId) {
          try {
            const jwtSecret = (strapi.config.get('admin.auth.secret') || process.env.ADMIN_JWT_SECRET || 'strapi-admin-secret') as string;
            const payload: any = jwt.verify(token, jwtSecret);
            if (payload) userId = payload.id || payload.userId;
          } catch (e) {
            try {
              const payload: any = jwt.decode(token);
              if (payload) userId = payload.id || payload.userId;
            } catch (e2) {}
          }
        }

        if (userId) {
          user = await (strapi.db.query('admin::user' as any) as any).findOne({
            where: { id: userId },
            populate: ['roles'],
          });
        }
      }
    } catch (err) {}
  }

  return user;
}

function issueAdminJwtToken(strapi: any, user: any): string {
  try {
    const tokenService = strapi.service('admin::token');
    if (tokenService && typeof tokenService.createJwtToken === 'function') {
      return tokenService.createJwtToken(user);
    }
  } catch (e) {}

  const jwtSecret = (strapi.config.get('admin.auth.secret') || process.env.ADMIN_JWT_SECRET || 'strapi-admin-secret') as string;
  return jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '30d' });
}

function sanitizeAdminUser(user: any) {
  if (!user) return user;
  const copy = { ...user };
  delete copy.totpSecret;
  delete copy.password;
  delete copy.resetPasswordToken;
  delete copy.registrationToken;
  return copy;
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

const pendingSetupSecrets = new Map<number | string, string>();
const failedAttemptsMap = new Map<number | string, { count: number; lockedUntil?: number }>();

function checkRateLimit(userId: number | string): { allowed: boolean; message?: string } {
  const record = failedAttemptsMap.get(userId);
  if (!record) return { allowed: true };

  const now = Date.now();
  if (record.lockedUntil && now < record.lockedUntil) {
    const secondsRemaining = Math.ceil((record.lockedUntil - now) / 1000);
    return {
      allowed: false,
      message: `Too many failed 2FA attempts. Account locked for 2FA for ${secondsRemaining} seconds.`,
    };
  }

  if (record.lockedUntil && now >= record.lockedUntil) {
    failedAttemptsMap.delete(userId);
    return { allowed: true };
  }

  return { allowed: true };
}

function recordFailedAttempt(userId: number | string) {
  const now = Date.now();
  const record = failedAttemptsMap.get(userId) || { count: 0 };
  record.count += 1;

  if (record.count >= 5) {
    record.lockedUntil = now + 5 * 60 * 1000;
  }

  failedAttemptsMap.set(userId, record);
}

function clearFailedAttempts(userId: number | string) {
  failedAttemptsMap.delete(userId);
}

export default ({ strapi }: { strapi: any }) => ({
  async getStatus(ctx: any) {
    try {
      const user = await getAdminUser(ctx, strapi);
      if (!user) return ctx.unauthorized('User not authenticated.');

      const user2FA = await getUser2FA(strapi, user.id);
      let codes = user2FA.recoveryCodes;

      if (user2FA.totpEnabled && (!codes || codes.length === 0)) {
        codes = generateRecoveryCodes(8);
        await setUser2FA(strapi, user.id, user2FA.totpSecret, true, codes);
      }

      const isAdmin = isAdminOrSuperAdmin(user);

      return ctx.send({
        isEnabled: user2FA.totpEnabled,
        email: user.email,
        isAdmin,
        roles: (user.roles || []).map((r: any) => r.name || r.code),
        recoveryCodes: user2FA.totpEnabled ? codes : [],
      });
    } catch (err) {
      return ctx.badRequest('Failed to fetch 2FA status', { error: err });
    }
  },

  async setup2FA(ctx: any) {
    try {
      const user = await getAdminUser(ctx, strapi);
      if (!user) return ctx.unauthorized('User not authenticated.');

      const secret = speakeasy.generateSecret({
        name: `Addact CMS (${user.email || user.username || 'Admin'})`,
        issuer: 'Addact Technologies',
        length: 20,
      });

      pendingSetupSecrets.set(user.id, secret.base32);

      const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url || '');

      return ctx.send({
        success: true,
        qrCode: qrCodeUrl,
        secret: secret.base32,
      });
    } catch (err) {
      return ctx.badRequest('Failed to generate 2FA setup QR code', { error: err });
    }
  },

  async enable2FA(ctx: any) {
    try {
      const user = await getAdminUser(ctx, strapi);
      if (!user) return ctx.unauthorized('User not authenticated.');

      const { token, secret } = ctx.request.body || {};
      const secretToVerify = secret || pendingSetupSecrets.get(user.id);

      if (!token || !secretToVerify) {
        return ctx.badRequest('Verification code (6 digits) and secret are required.');
      }

      const rateCheck = checkRateLimit(user.id);
      if (!rateCheck.allowed) {
        return ctx.badRequest(rateCheck.message);
      }

      const verified = speakeasy.totp.verify({
        secret: secretToVerify,
        encoding: 'base32',
        token: String(token).trim(),
        window: 1,
      });

      if (!verified) {
        recordFailedAttempt(user.id);
        return ctx.badRequest('Invalid 6-digit verification code. Please check your Authenticator app.');
      }

      clearFailedAttempts(user.id);

      const recoveryCodes = generateRecoveryCodes(8);
      await setUser2FA(strapi, user.id, secretToVerify, true, recoveryCodes);

      pendingSetupSecrets.delete(user.id);

      // Record Audit Log for successful 2FA activation & login session
      try {
        const auditService = strapi.service('api::audit-log.audit-log' as any) as any;
        if (auditService && typeof auditService.createLog === 'function') {
          const fullName = `${user.firstname || ''} ${user.lastname || ''}`.trim();
          const rawClientId = ctx.headers?.['x-client-id'] || ctx.request?.headers?.['x-client-id'];
          const clientId = sanitizeClientId(rawClientId) || undefined;

          const rawIp = ctx.headers?.['x-forwarded-for'] || ctx.ip || ctx.request?.ip || '127.0.0.1';
          const ipAddress = typeof rawIp === 'string' ? rawIp.split(',')[0].trim() : '127.0.0.1';
          const location = await getLocationFromIp(ipAddress);

          const uaString = (typeof ctx.get === 'function' ? ctx.get('user-agent') : '') || ctx.headers?.['user-agent'] || ctx.request?.headers?.['user-agent'] || '';
          const { browser, os: osName, deviceType } = parseUserAgent(uaString);

          await auditService.createLog({
            userName: fullName || user.username || user.email || 'Admin User',
            userEmail: user.email || 'N/A',
            action: 'Login',
            contentType: 'Admin Auth',
            targetDocumentId: '2FA Activated & Logged In',
            updatedFields: ['User activated 2FA protection and authenticated'],
            ipAddress,
            clientId,
            location,
            browser,
            os: osName,
            deviceType,
            systemUser: SERVER_SYSTEM_USER,
          });
        }
      } catch (logErr) {
        strapi.log.error('enable2FA: Failed to record audit log:', logErr);
      }

      return ctx.send({
        success: true,
        message: '2-Factor Authentication successfully enabled!',
        recoveryCodes,
      });
    } catch (err) {
      return ctx.badRequest('Failed to enable 2FA', { error: err });
    }
  },

  async verifyLogin2FA(ctx: any) {
    try {
      const { challengeToken, token, email } = ctx.request.body || {};
      const otpCode = token || ctx.headers['x-2fa-code'];

      if (!otpCode) {
        return ctx.badRequest('Verification code or recovery code is required.');
      }

      let targetUserId: number | string | null = null;
      const jwtSecret = (strapi.config.get('admin.auth.secret') || process.env.ADMIN_JWT_SECRET || 'strapi-admin-secret') as string;

      if (challengeToken) {
        try {
          const decoded: any = jwt.verify(challengeToken, jwtSecret);
          if (decoded && decoded.requires2FA && decoded.userId) {
            targetUserId = decoded.userId;
          }
        } catch (e) {
          return ctx.badRequest('Invalid or expired 2FA challenge token. Please login again.');
        }
      }

      let user: any = null;
      if (targetUserId) {
        user = await (strapi.db.query('admin::user' as any) as any).findOne({
          where: { id: targetUserId },
          populate: ['roles'],
        });
      } else if (email) {
        user = await (strapi.db.query('admin::user' as any) as any).findOne({
          where: { email: email.trim().toLowerCase() },
          populate: ['roles'],
        });
      }

      if (!user) {
        return ctx.notFound('Admin user not found.');
      }

      const user2FA = await getUser2FA(strapi, user.id);

      if (!user2FA.totpEnabled || !user2FA.totpSecret) {
        return ctx.badRequest('2FA is not enabled for this account.');
      }

      const rateCheck = checkRateLimit(user.id);
      if (!rateCheck.allowed) {
        return ctx.badRequest(rateCheck.message);
      }

      const rawOtp = String(otpCode).trim().toUpperCase();
      let verified = false;

      if (rawOtp.length === 6 && /^\d+$/.test(rawOtp)) {
        verified = speakeasy.totp.verify({
          secret: user2FA.totpSecret,
          encoding: 'base32',
          token: rawOtp,
          window: 1,
        });
      }

      if (!verified && user2FA.recoveryCodes && user2FA.recoveryCodes.length > 0) {
        const normalizedInput = rawOtp.replace(/[^A-Z0-9]/g, '');
        const matchIndex = user2FA.recoveryCodes.findIndex((c: string) => {
          const normalizedCode = c.replace(/[^A-Z0-9]/g, '').toUpperCase();
          return normalizedCode === normalizedInput;
        });

        if (matchIndex !== -1) {
          verified = true;
          const updatedCodes = [...user2FA.recoveryCodes];
          updatedCodes.splice(matchIndex, 1);
          await setUser2FA(strapi, user.id, user2FA.totpSecret, true, updatedCodes);
          strapi.log.info(`2FA Controller: User ${user.email} logged in using an emergency recovery code.`);
        }
      }

      if (!verified) {
        recordFailedAttempt(user.id);
        return ctx.badRequest('Invalid 6-digit verification code or recovery code. Access denied.');
      }

      clearFailedAttempts(user.id);

      try {
        const auditService = strapi.service('api::audit-log.audit-log' as any) as any;
        if (auditService && typeof auditService.createLog === 'function') {
          const fullName = `${user.firstname || ''} ${user.lastname || ''}`.trim();
          const rawClientId = ctx.headers?.['x-client-id'] || ctx.request?.headers?.['x-client-id'];
          const clientId = sanitizeClientId(rawClientId) || undefined;

          const rawIp = ctx.headers?.['x-forwarded-for'] || ctx.ip || ctx.request?.ip || '127.0.0.1';
          const ipAddress = typeof rawIp === 'string' ? rawIp.split(',')[0].trim() : '127.0.0.1';
          const location = await getLocationFromIp(ipAddress);

          const uaString = (typeof ctx.get === 'function' ? ctx.get('user-agent') : '') || ctx.headers?.['user-agent'] || ctx.request?.headers?.['user-agent'] || '';
          const { browser, os: osName, deviceType } = parseUserAgent(uaString);

          await auditService.createLog({
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
      } catch (e) {
        strapi.log.error('2FA Controller: Failed to record login audit log:', e);
      }

      const jwtToken = issueAdminJwtToken(strapi, user);
      const sanitizedUser = sanitizeAdminUser(user);

      return ctx.send({
        data: {
          token: jwtToken,
          user: sanitizedUser,
        },
      });
    } catch (err) {
      return ctx.badRequest('2FA login verification failed', { error: err });
    }
  },

  async disable2FA(ctx: any) {
    try {
      const user = await getAdminUser(ctx, strapi);
      if (!user) return ctx.unauthorized('User not authenticated.');

      const { token } = ctx.request.body || {};
      const user2FA = await getUser2FA(strapi, user.id);

      if (!token || !user2FA.totpSecret) {
        return ctx.badRequest('Verification code is required to disable 2FA.');
      }

      const rateCheck = checkRateLimit(user.id);
      if (!rateCheck.allowed) {
        return ctx.badRequest(rateCheck.message);
      }

      const rawCode = String(token).trim().toUpperCase();
      let verified = speakeasy.totp.verify({
        secret: user2FA.totpSecret,
        encoding: 'base32',
        token: rawCode,
        window: 1,
      });

      if (!verified && user2FA.recoveryCodes && user2FA.recoveryCodes.length > 0) {
        const normalizedInput = rawCode.replace(/[^A-Z0-9]/g, '');
        const matchIndex = user2FA.recoveryCodes.findIndex((c: string) => {
          const normalizedCode = c.replace(/[^A-Z0-9]/g, '').toUpperCase();
          return normalizedCode === normalizedInput;
        });
        if (matchIndex !== -1) {
          verified = true;
        }
      }

      if (!verified) {
        recordFailedAttempt(user.id);
        return ctx.badRequest('Invalid code. Cannot disable 2FA.');
      }

      clearFailedAttempts(user.id);

      await setUser2FA(strapi, user.id, null, false, null);

      return ctx.send({ success: true, message: '2-Factor Authentication disabled.' });
    } catch (err) {
      return ctx.badRequest('Failed to disable 2FA', { error: err });
    }
  },

  async regenerateRecoveryCodes(ctx: any) {
    try {
      const user = await getAdminUser(ctx, strapi);
      if (!user) return ctx.unauthorized('User not authenticated.');

      const user2FA = await getUser2FA(strapi, user.id);
      if (!user2FA.totpEnabled || !user2FA.totpSecret) {
        return ctx.badRequest('2FA is not enabled for this account.');
      }

      const newCodes = generateRecoveryCodes(8);
      await setUser2FA(strapi, user.id, user2FA.totpSecret, true, newCodes);

      return ctx.send({
        success: true,
        message: 'New recovery codes generated successfully.',
        recoveryCodes: newCodes,
      });
    } catch (err) {
      return ctx.badRequest('Failed to regenerate recovery codes', { error: err });
    }
  },

  async getUsersOverview(ctx: any) {
    try {
      const user = await getAdminUser(ctx, strapi);
      if (!user) return ctx.unauthorized('User not authenticated.');

      if (!isAdminOrSuperAdmin(user)) {
        return ctx.forbidden('Access denied. Administrator privileges required.');
      }

      await ensure2FATable(strapi);
      const knex = strapi.db.connection;

      const users = await (strapi.db.query('admin::user' as any) as any).findMany({
        populate: ['roles'],
        orderBy: { createdAt: 'desc' },
      });

      const rows = await knex('strapi_2fa_secrets').select('user_id', 'totp_enabled', 'recovery_codes');
      const secretMap = new Map();
      for (const r of rows) {
        secretMap.set(String(r.user_id), r);
      }

      const usersList = (users || []).map((u: any) => {
        const sec = secretMap.get(String(u.id));
        const is2FA = Boolean(sec ? sec.totp_enabled : u.totpEnabled);
        let recoveryCount = 0;
        if (sec && sec.recovery_codes) {
          try {
            const parsed = JSON.parse(sec.recovery_codes);
            if (Array.isArray(parsed)) recoveryCount = parsed.length;
          } catch (e) {}
        }

        const roles = (u.roles || []).map((r: any) => r.name || r.code);
        const fullName = `${u.firstname || ''} ${u.lastname || ''}`.trim();

        return {
          id: u.id,
          name: fullName || u.username || u.email,
          email: u.email,
          username: u.username,
          isActive: Boolean(u.isActive),
          roles,
          is2FAEnabled: is2FA,
          recoveryCodesCount: is2FA ? recoveryCount : 0,
          createdAt: u.createdAt,
        };
      });

      const totalUsers = usersList.length;
      const enabledCount = usersList.filter((u: any) => u.is2FAEnabled).length;
      const pendingCount = totalUsers - enabledCount;

      return ctx.send({
        success: true,
        data: {
          stats: {
            totalUsers,
            enabledCount,
            pendingCount,
          },
          users: usersList,
        },
      });
    } catch (err) {
      strapi.log.error('2FA Controller: getUsersOverview error:', err);
      return ctx.badRequest('Failed to fetch 2FA users overview', { error: err });
    }
  },

  async adminResetUser2FA(ctx: any) {
    try {
      const user = await getAdminUser(ctx, strapi);
      if (!user) return ctx.unauthorized('User not authenticated.');

      if (!isAdminOrSuperAdmin(user)) {
        return ctx.forbidden('Access denied. Administrator privileges required.');
      }

      const { targetUserId } = ctx.request.body || {};
      if (!targetUserId) {
        return ctx.badRequest('Target user ID is required.');
      }

      const targetUser = await (strapi.db.query('admin::user' as any) as any).findOne({
        where: { id: targetUserId },
        populate: ['roles'],
      });

      if (!targetUser) {
        return ctx.notFound('Target admin user not found.');
      }

      await setUser2FA(strapi, targetUserId, null, false, null);

      try {
        const auditService = strapi.service('api::audit-log.audit-log' as any) as any;
        if (auditService && typeof auditService.createLog === 'function') {
          const rawClientId = ctx.headers?.['x-client-id'] || ctx.request?.headers?.['x-client-id'];
          const clientId = sanitizeClientId(rawClientId) || undefined;
          const rawIp = ctx.headers?.['x-forwarded-for'] || ctx.ip || ctx.request?.ip || '127.0.0.1';
          const ipAddress = typeof rawIp === 'string' ? rawIp.split(',')[0].trim() : '127.0.0.1';
          const location = await getLocationFromIp(ipAddress);
          const uaString = (typeof ctx.get === 'function' ? ctx.get('user-agent') : '') || ctx.headers?.['user-agent'] || '';
          const { browser, os: osName, deviceType } = parseUserAgent(uaString);

          const adminName = `${user.firstname || ''} ${user.lastname || ''}`.trim() || user.username || user.email;
          const targetName = `${targetUser.firstname || ''} ${targetUser.lastname || ''}`.trim() || targetUser.username || targetUser.email;

          await auditService.createLog({
            userName: adminName,
            userEmail: user.email || 'N/A',
            action: 'Update',
            contentType: 'Admin 2FA Security',
            targetDocumentId: `User #${targetUser.id} (${targetName} - ${targetUser.email})`,
            updatedFields: ['2FA Disabled/Reset by Administrator'],
            ipAddress,
            clientId,
            location,
            browser,
            os: osName,
            deviceType,
            systemUser: SERVER_SYSTEM_USER,
          });
        }
      } catch (e) {
        strapi.log.error('adminResetUser2FA: Failed to record audit log:', e);
      }

      return ctx.send({
        success: true,
        message: `2-Factor Authentication reset successfully for ${targetUser.email}.`,
      });
    } catch (err) {
      strapi.log.error('2FA Controller: adminResetUser2FA error:', err);
      return ctx.badRequest('Failed to reset user 2FA', { error: err });
    }
  },

  async adminRegenerateUserRecoveryCodes(ctx: any) {
    try {
      const user = await getAdminUser(ctx, strapi);
      if (!user) return ctx.unauthorized('User not authenticated.');

      if (!isAdminOrSuperAdmin(user)) {
        return ctx.forbidden('Access denied. Administrator privileges required.');
      }

      const { targetUserId } = ctx.request.body || {};
      if (!targetUserId) {
        return ctx.badRequest('Target user ID is required.');
      }

      const targetUser = await (strapi.db.query('admin::user' as any) as any).findOne({
        where: { id: targetUserId },
        populate: ['roles'],
      });

      if (!targetUser) {
        return ctx.notFound('Target admin user not found.');
      }

      const user2FA = await getUser2FA(strapi, targetUserId);
      if (!user2FA.totpEnabled || !user2FA.totpSecret) {
        return ctx.badRequest(`Cannot regenerate recovery codes. ${targetUser.email} has not enabled 2FA yet.`);
      }

      const newCodes = generateRecoveryCodes(8);
      await setUser2FA(strapi, targetUserId, user2FA.totpSecret, true, newCodes);

      try {
        const auditService = strapi.service('api::audit-log.audit-log' as any) as any;
        if (auditService && typeof auditService.createLog === 'function') {
          const rawClientId = ctx.headers?.['x-client-id'] || ctx.request?.headers?.['x-client-id'];
          const clientId = sanitizeClientId(rawClientId) || undefined;
          const rawIp = ctx.headers?.['x-forwarded-for'] || ctx.ip || ctx.request?.ip || '127.0.0.1';
          const ipAddress = typeof rawIp === 'string' ? rawIp.split(',')[0].trim() : '127.0.0.1';
          const location = await getLocationFromIp(ipAddress);
          const uaString = (typeof ctx.get === 'function' ? ctx.get('user-agent') : '') || ctx.headers?.['user-agent'] || '';
          const { browser, os: osName, deviceType } = parseUserAgent(uaString);

          const adminName = `${user.firstname || ''} ${user.lastname || ''}`.trim() || user.username || user.email;
          const targetName = `${targetUser.firstname || ''} ${targetUser.lastname || ''}`.trim() || targetUser.username || targetUser.email;

          await auditService.createLog({
            userName: adminName,
            userEmail: user.email || 'N/A',
            action: 'Update',
            contentType: 'Admin 2FA Security',
            targetDocumentId: `User #${targetUser.id} (${targetName} - ${targetUser.email})`,
            updatedFields: ['Emergency Recovery Codes Regenerated by Administrator'],
            ipAddress,
            clientId,
            location,
            browser,
            os: osName,
            deviceType,
            systemUser: SERVER_SYSTEM_USER,
          });
        }
      } catch (e) {
        strapi.log.error('adminRegenerateUserRecoveryCodes: Failed to record audit log:', e);
      }

      return ctx.send({
        success: true,
        message: `New recovery codes generated successfully for ${targetUser.email}.`,
        recoveryCodes: newCodes,
      });
    } catch (err) {
      strapi.log.error('2FA Controller: adminRegenerateUserRecoveryCodes error:', err);
      return ctx.badRequest('Failed to regenerate recovery codes', { error: err });
    }
  },
});
