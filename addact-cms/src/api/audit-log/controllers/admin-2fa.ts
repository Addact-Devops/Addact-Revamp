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

function getEncryptionKey(strapi: any): Buffer {
  const secret =
    strapi.config.get('admin.secrets.encryptionKey') ||
    process.env.ENCRYPTION_KEY ||
    strapi.config.get('admin.auth.secret') ||
    process.env.ADMIN_JWT_SECRET ||
    'fallback-local-key';
  return crypto.createHash('sha256').update(String(secret)).digest();
}

/**
 * Encrypt TOTP secret at rest using AES-256-GCM.
 */
function encryptSecret(text: string | null, strapi: any): string | null {
  if (!text) return null;
  try {
    const key = getEncryptionKey(strapi);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    return `enc:${iv.toString('hex')}:${authTag}:${encrypted}`;
  } catch (err) {
    strapi.log.error('2FA encryptSecret error:', err);
    return text;
  }
}

/**
 * Decrypt TOTP secret from storage. Preserves backward compatibility with legacy plaintext secrets.
 */
function decryptSecret(encryptedText: string | null, strapi: any): string | null {
  if (!encryptedText) return null;
  if (!encryptedText.startsWith('enc:')) {
    // Legacy plaintext backward compatibility
    return encryptedText;
  }
  try {
    const parts = encryptedText.split(':');
    if (parts.length !== 4) return null;
    const iv = Buffer.from(parts[1], 'hex');
    const authTag = Buffer.from(parts[2], 'hex');
    const ciphertext = parts[3];
    const key = getEncryptionKey(strapi);
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    strapi.log.error('2FA decryptSecret error:', err);
    return null;
  }
}

/**
 * Hash recovery code with SHA-256 so raw recovery codes are never stored in plaintext at rest.
 */
function hashRecoveryCode(code: string): string {
  const normalized = code.replace(/[^A-Z0-9]/g, '').toUpperCase();
  return crypto.createHash('sha256').update(normalized).digest('hex');
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

    // Shared rate limits table for multi-instance deployments and restart persistence
    const hasRateLimitsTable = await knex.schema.hasTable('strapi_2fa_rate_limits');
    if (!hasRateLimitsTable) {
      await knex.schema.createTable('strapi_2fa_rate_limits', (table: any) => {
        table.string('key', 255).primary();
        table.integer('count').defaultTo(0);
        table.bigInteger('locked_until').nullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
      strapi.log.info('2FA Controller: Created strapi_2fa_rate_limits database table.');
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
        totpSecret: decryptSecret(row.totp_secret, strapi),
        totpEnabled: Boolean(row.totp_enabled),
        recoveryCodes,
      };
    }
  } catch (e) {}

  // Fallback check to admin::user record if table lookup yields nothing (legacy migration)
  try {
    const dbUser = await (strapi.db.query('admin::user' as any) as any).findOne({
      where: { id: userId },
    });
    if (dbUser && dbUser.totpEnabled) {
      return {
        totpSecret: decryptSecret(dbUser.totpSecret, strapi),
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

    const encryptedSecret = secret ? encryptSecret(secret, strapi) : null;

    let storedRecoveryCodes: string | null = null;
    if (recoveryCodes !== undefined && recoveryCodes !== null) {
      // Store recovery codes strictly as secure SHA-256 hashes
      const hashedCodes = recoveryCodes.map((code) => hashRecoveryCode(code));
      storedRecoveryCodes = JSON.stringify(hashedCodes);
    }

    const updateData: any = {
      totp_secret: encryptedSecret,
      totp_enabled: enabled,
      updated_at: knex.fn.now(),
    };

    if (recoveryCodes !== undefined) {
      updateData.recovery_codes = storedRecoveryCodes;
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

    // Clean up any legacy plaintext authentication secrets from admin-user record to avoid data duplication
    if (secret === null) {
      try {
        await (strapi.db.query('admin::user' as any) as any).update({
          where: { id: userId },
          data: {
            totpSecret: null,
            totpEnabled: false,
          },
        });
      } catch (e) {}
    }
  } catch (e) {
    strapi.log.error('2FA Controller: setUser2FA error:', e);
  }
}

export async function getAdminUser(ctx: any, strapi: any): Promise<any> {
  let user = ctx.state?.user;

  if (user && (!user.roles || user.roles.length === 0)) {
    try {
      const fullUser = await (strapi.db.query('admin::user' as any) as any).findOne({
        where: { id: user.id },
        populate: ['roles'],
      });
      if (fullUser) user = fullUser;
    } catch (e) {}
  }

  const authHeader =
    ctx.headers?.authorization ||
    ctx.header?.authorization ||
    ctx.request?.headers?.authorization ||
    ctx.request?.header?.authorization;

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
            const jwtSecret = (strapi.config.get('admin.auth.secret') || process.env.ADMIN_JWT_SECRET) as string;
            if (jwtSecret) {
              const payload: any = jwt.verify(token, jwtSecret);
              if (payload) userId = payload.id || payload.userId;
            }
          } catch (e) {
            // Invalid or expired token: reject without falling back to unverified jwt.decode()
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
  } catch (e) {
    strapi.log.error('[2FA Issue Token] Failed to create token via admin::token service:', e);
  }

  const jwtSecret = (strapi.config.get('admin.auth.secret') || process.env.ADMIN_JWT_SECRET) as string;
  if (!jwtSecret) {
    throw new Error('Admin JWT secret is not configured. Token issuance failed securely.');
  }
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

export function isAdminOrSuperAdmin(user: any): boolean {
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
const memoryFallbackRateLimitMap = new Map<string, { count: number; lockedUntil?: number }>();

/**
 * Shared rate-limiting across multi-instance deployments using MySQL database table,
 * with memory map fallback in case of database unavailability.
 */
async function checkRateLimit(strapi: any, key: string, label = '2FA'): Promise<{ allowed: boolean; message?: string }> {
  const strKey = String(key);
  const now = Date.now();

  try {
    await ensure2FATable(strapi);
    const knex = strapi.db.connection;
    const row = await knex('strapi_2fa_rate_limits').where({ key: strKey }).first();

    if (row && row.locked_until) {
      const lockedUntil = Number(row.locked_until);
      if (now < lockedUntil) {
        const secondsRemaining = Math.ceil((lockedUntil - now) / 1000);
        return {
          allowed: false,
          message: `Too many failed ${label} attempts. Temporarily locked for ${secondsRemaining} seconds.`,
        };
      }
      // Lock period has expired: remove expired entry
      await knex('strapi_2fa_rate_limits').where({ key: strKey }).delete();
    }
  } catch (err) {
    strapi.log.warn('2FA: Shared rate-limit check failed, falling back to memory map:', err);
    const memRecord = memoryFallbackRateLimitMap.get(strKey);
    if (memRecord && memRecord.lockedUntil && now < memRecord.lockedUntil) {
      const secondsRemaining = Math.ceil((memRecord.lockedUntil - now) / 1000);
      return {
        allowed: false,
        message: `Too many failed ${label} attempts. Temporarily locked for ${secondsRemaining} seconds.`,
      };
    }
  }

  return { allowed: true };
}

async function recordFailedAttempt(strapi: any, key: string) {
  const strKey = String(key);
  const now = Date.now();

  try {
    await ensure2FATable(strapi);
    const knex = strapi.db.connection;
    const existing = await knex('strapi_2fa_rate_limits').where({ key: strKey }).first();

    const newCount = (existing ? Number(existing.count || 0) : 0) + 1;
    const lockedUntil = newCount >= 5 ? now + 5 * 60 * 1000 : null;

    if (existing) {
      await knex('strapi_2fa_rate_limits')
        .where({ key: strKey })
        .update({
          count: newCount,
          locked_until: lockedUntil,
          updated_at: knex.fn.now(),
        });
    } else {
      await knex('strapi_2fa_rate_limits').insert({
        key: strKey,
        count: newCount,
        locked_until: lockedUntil,
        updated_at: knex.fn.now(),
      });
    }
  } catch (err) {
    strapi.log.warn('2FA: Shared rate-limit record failed, falling back to memory map:', err);
  }

  // Also maintain in-memory fallback
  const memRecord = memoryFallbackRateLimitMap.get(strKey) || { count: 0 };
  memRecord.count += 1;
  if (memRecord.count >= 5) {
    memRecord.lockedUntil = now + 5 * 60 * 1000;
  }
  memoryFallbackRateLimitMap.set(strKey, memRecord);
}

async function clearFailedAttempts(strapi: any, key: string) {
  const strKey = String(key);
  try {
    await ensure2FATable(strapi);
    const knex = strapi.db.connection;
    await knex('strapi_2fa_rate_limits').where({ key: strKey }).delete();
  } catch (err) {}
  memoryFallbackRateLimitMap.delete(strKey);
}

export default ({ strapi }: { strapi: any }) => ({
  async getStatus(ctx: any) {
    try {
      const user = await getAdminUser(ctx, strapi);
      if (!user) return ctx.unauthorized('User not authenticated.');

      const user2FA = await getUser2FA(strapi, user.id);
      const isAdmin = isAdminOrSuperAdmin(user);

      return ctx.send({
        isEnabled: user2FA.totpEnabled,
        email: user.email,
        isAdmin,
        roles: (user.roles || []).map((r: any) => r.name || r.code),
        hasRecoveryCodes: Boolean(user2FA.recoveryCodes && user2FA.recoveryCodes.length > 0),
        recoveryCodesCount: user2FA.recoveryCodes ? user2FA.recoveryCodes.length : 0,
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

      const rateCheck = await checkRateLimit(strapi, `user:${user.id}`);
      if (!rateCheck.allowed) {
        return ctx.badRequest(rateCheck.message);
      }

      const verified = speakeasy.totp.verify({
        secret: secretToVerify,
        encoding: 'base32',
        token: String(token).trim(),
        window: 2,
      });

      if (!verified) {
        await recordFailedAttempt(strapi, `user:${user.id}`);
        return ctx.badRequest('Invalid 6-digit verification code. Please check your Authenticator app.');
      }

      await clearFailedAttempts(strapi, `user:${user.id}`);

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
      const { challengeToken, token } = ctx.request.body || {};
      const otpCode = token || ctx.headers['x-2fa-code'];

      if (!challengeToken) {
        return ctx.badRequest('A valid 2FA challenge token is required. Please login with your credentials first.');
      }

      if (!otpCode) {
        return ctx.badRequest('Verification code or recovery code is required.');
      }

      const rawIp = ctx.headers?.['x-forwarded-for'] || ctx.ip || ctx.request?.ip || '127.0.0.1';
      const ipAddress = typeof rawIp === 'string' ? rawIp.split(',')[0].trim() : '127.0.0.1';

      const ipRate = await checkRateLimit(strapi, `ip:${ipAddress}`, 'login');
      if (!ipRate.allowed) {
        return ctx.badRequest(ipRate.message);
      }

      const jwtSecret = (strapi.config.get('admin.auth.secret') || process.env.ADMIN_JWT_SECRET) as string;
      if (!jwtSecret) {
        strapi.log.error('[2FA Verify] Admin JWT secret is not configured.');
        return ctx.internalServerError('Authentication service unavailable.');
      }

      let targetUserId: number | string | null = null;
      try {
        const decoded: any = jwt.verify(challengeToken, jwtSecret);
        if (decoded && decoded.requires2FA && decoded.type === '2fa_challenge' && decoded.userId) {
          targetUserId = decoded.userId;
        } else {
          return ctx.badRequest('Invalid 2FA challenge token payload. Please login again.');
        }
      } catch (e) {
        await recordFailedAttempt(strapi, `ip:${ipAddress}`);
        return ctx.badRequest('Invalid or expired 2FA challenge token. Please login again.');
      }

      const user = await (strapi.db.query('admin::user' as any) as any).findOne({
        where: { id: targetUserId },
        populate: ['roles'],
      });

      if (!user) {
        return ctx.notFound('Admin user not found.');
      }

      const user2FA = await getUser2FA(strapi, user.id);

      if (!user2FA.totpEnabled || !user2FA.totpSecret) {
        return ctx.badRequest('2FA is not enabled for this account.');
      }

      const rateCheck = await checkRateLimit(strapi, `user:${user.id}`);
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
          window: 2,
        });
      }

      if (!verified && user2FA.recoveryCodes && user2FA.recoveryCodes.length > 0) {
        const normalizedInput = rawOtp.replace(/[^A-Z0-9]/g, '');
        const inputHash = hashRecoveryCode(normalizedInput);

        const matchIndex = user2FA.recoveryCodes.findIndex((c: string) => {
          if (c === inputHash) return true;
          const normalizedCode = c.replace(/[^A-Z0-9]/g, '').toUpperCase();
          return normalizedCode === normalizedInput;
        });

        if (matchIndex !== -1) {
          verified = true;
          const updatedCodes = [...user2FA.recoveryCodes];
          updatedCodes.splice(matchIndex, 1);
          const knex = strapi.db.connection;
          await knex('strapi_2fa_secrets')
            .where({ user_id: String(user.id) })
            .update({
              recovery_codes: JSON.stringify(updatedCodes),
              updated_at: knex.fn.now(),
            });
          strapi.log.info(`2FA Controller: User ${user.email} logged in using an emergency recovery code.`);
        }
      }

      if (!verified) {
        await recordFailedAttempt(strapi, `user:${user.id}`);
        await recordFailedAttempt(strapi, `ip:${ipAddress}`);
        return ctx.badRequest('Invalid 6-digit verification code or recovery code. Access denied.');
      }

      await clearFailedAttempts(strapi, `user:${user.id}`);
      await clearFailedAttempts(strapi, `ip:${ipAddress}`);

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

      const rateCheck = await checkRateLimit(strapi, `user:${user.id}`);
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
        const inputHash = hashRecoveryCode(normalizedInput);
        const matchIndex = user2FA.recoveryCodes.findIndex((c: string) => {
          if (c === inputHash) return true;
          const normalizedCode = c.replace(/[^A-Z0-9]/g, '').toUpperCase();
          return normalizedCode === normalizedInput;
        });
        if (matchIndex !== -1) {
          verified = true;
        }
      }

      if (!verified) {
        await recordFailedAttempt(strapi, `user:${user.id}`);
        return ctx.badRequest('Invalid code. Cannot disable 2FA.');
      }

      await clearFailedAttempts(strapi, `user:${user.id}`);

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

      // Step-up authentication: Require fresh TOTP verification code to prevent unauthorized regeneration from compromised sessions
      const { token } = ctx.request.body || {};
      const otpCode = token || ctx.headers['x-2fa-code'];
      if (!otpCode) {
        return ctx.badRequest('Fresh 6-digit TOTP verification code is required to regenerate recovery codes.');
      }

      const rateCheck = await checkRateLimit(strapi, `user:${user.id}`);
      if (!rateCheck.allowed) {
        return ctx.badRequest(rateCheck.message);
      }

      const verified = speakeasy.totp.verify({
        secret: user2FA.totpSecret,
        encoding: 'base32',
        token: String(otpCode).trim(),
        window: 1,
      });

      if (!verified) {
        await recordFailedAttempt(strapi, `user:${user.id}`);
        return ctx.badRequest('Invalid 6-digit verification code. Failed to regenerate recovery codes.');
      }

      await clearFailedAttempts(strapi, `user:${user.id}`);

      const knex = strapi.db.connection;
      const newCodes = generateRecoveryCodes(8);
      const hashedCodes = newCodes.map((c) => hashRecoveryCode(c));

      // Invalidate previous codes and set new hashed codes atomically within a transaction
      await knex.transaction(async (trx: any) => {
        await trx('strapi_2fa_secrets')
          .where({ user_id: String(user.id) })
          .update({
            recovery_codes: JSON.stringify(hashedCodes),
            updated_at: trx.fn.now(),
          });
      });

      // Record Audit Log for recovery codes regeneration
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

          await auditService.createLog({
            userName: adminName,
            userEmail: user.email || 'N/A',
            action: 'Update',
            contentType: 'Admin 2FA Security',
            targetDocumentId: `User #${user.id} (${adminName} - ${user.email})`,
            updatedFields: ['Recovery Codes Regenerated (Fresh TOTP Step-Up Authenticated)'],
            ipAddress,
            clientId,
            location,
            browser,
            os: osName,
            deviceType,
            systemUser: SERVER_SYSTEM_USER,
          });
        }
      } catch (e) {}

      return ctx.send({
        success: true,
        message: 'New recovery codes generated successfully. Previous recovery codes have been invalidated.',
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
      const hashedCodes = newCodes.map((c) => hashRecoveryCode(c));
      const knex = strapi.db.connection;
      await knex.transaction(async (trx: any) => {
        await trx('strapi_2fa_secrets')
          .where({ user_id: String(targetUserId) })
          .update({
            recovery_codes: JSON.stringify(hashedCodes),
            updated_at: trx.fn.now(),
          });
      });

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
