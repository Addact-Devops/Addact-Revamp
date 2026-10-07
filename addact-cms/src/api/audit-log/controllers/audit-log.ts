import { factories } from '@strapi/strapi';
import jwt from 'jsonwebtoken';

async function getAdminUser(ctx: any, strapi: any): Promise<any> {
  let user = ctx.state?.user;

  const authHeader = ctx.headers?.authorization || ctx.header?.authorization;
  if (!user && authHeader) {
    try {
      const token = authHeader.replace(/^Bearer\s+/i, '').trim();
      if (token) {
        let payload: any = null;
        try {
          payload = jwt.decode(token);
        } catch (e) {}

        if (payload) {
          const userId = payload.id || payload.userId;
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

  // Primary Super Admin (ID 1)
  if (user.id === 1 || user.id === '1') return true;

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
    } catch (err) {
      strapi.log.error('AuditLog Controller findLogs error:', err);
      return ctx.badRequest('Failed to fetch audit logs', { error: err });
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
      const data = await service.exportLogs(ctx.query);

      ctx.set('Content-Type', 'application/json');
      ctx.set('Content-Disposition', `attachment; filename=cms-audit-logs-${new Date().toISOString().slice(0, 10)}.json`);
      return ctx.send(JSON.stringify(data, null, 2));
    } catch (err) {
      strapi.log.error('AuditLog Controller exportLogs error:', err);
      return ctx.badRequest('Failed to export audit logs', { error: err });
    }
  },

  // Delete a single log by its numeric DB id
  async deleteLog(ctx: any) {
    try {
      const user = await getAdminUser(ctx, strapi);
      if (!isAdminOrSuperAdmin(user)) {
        return ctx.forbidden('Access Denied: Audit Logs are only accessible to Super Admin and Admin users.');
      }

      const { id } = ctx.params;
      if (!id) return ctx.badRequest('Log ID is required.');

      const service = strapi.service('api::audit-log.audit-log' as any) as any;
      await service.deleteLog(Number(id));
      return ctx.send({ success: true, message: `Log #${id} deleted.` });
    } catch (err) {
      strapi.log.error('AuditLog Controller deleteLog error:', err);
      return ctx.badRequest('Failed to delete audit log', { error: err });
    }
  },

  // Delete ALL logs (or filtered subset by action/contentType/date)
  async deleteAllLogs(ctx: any) {
    try {
      const user = await getAdminUser(ctx, strapi);
      if (!isAdminOrSuperAdmin(user)) {
        return ctx.forbidden('Access Denied: Audit Logs are only accessible to Super Admin and Admin users.');
      }

      const service = strapi.service('api::audit-log.audit-log' as any) as any;
      const count = await service.deleteAllLogs(ctx.query);
      return ctx.send({ success: true, message: `${count} log(s) deleted.`, count });
    } catch (err) {
      strapi.log.error('AuditLog Controller deleteAllLogs error:', err);
      return ctx.badRequest('Failed to delete audit logs', { error: err });
    }
  },
}));
