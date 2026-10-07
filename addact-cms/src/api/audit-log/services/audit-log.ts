import { factories } from '@strapi/strapi';

export interface CreateAuditLogPayload {
  userName?: string;
  userEmail?: string;
  action: 'Create' | 'Update' | 'Delete' | 'Publish' | 'Unpublish' | 'Login' | 'Logout';
  contentType?: string;
  targetDocumentId?: string;
  updatedFields?: string[];
  ipAddress?: string;
  clientId?: string;
  location?: string;
  browser?: string;
  os?: string;
  deviceType?: string;
  systemUser?: string;
}

export default factories.createCoreService('api::audit-log.audit-log' as any, ({ strapi }) => ({
  /**
   * Fail-safe log creation
   */
  async createLog(payload: CreateAuditLogPayload) {
    try {
      await (strapi.documents('api::audit-log.audit-log' as any) as any).create({
        data: {
          userName: payload.userName || 'Unknown User',
          userEmail: payload.userEmail || 'N/A',
          action: payload.action,
          contentType: payload.contentType || 'N/A',
          targetDocumentId: payload.targetDocumentId || null,
          updatedFields: payload.updatedFields && payload.updatedFields.length > 0 ? payload.updatedFields : null,
          ipAddress: payload.ipAddress || 'Unknown IP',
          clientId: payload.clientId || null,
          location: payload.location || null,
          browser: payload.browser || 'Unknown Browser',
          os: payload.os || 'Unknown OS',
          deviceType: payload.deviceType || 'Unknown',
          systemUser: payload.systemUser || null,
        },
      });
    } catch (err) {
      strapi.log.error('AuditLogService: Failed to record audit log:', err);
    }
  },

  /**
   * Find logs with filtering, search, and pagination
   */
  async findLogs(params: any = {}) {
    try {
      const page = parseInt(params.page, 10) || 1;
      const pageSize = parseInt(params.pageSize, 10) || 20;
      const filters: any = {};

      if (params.action && params.action !== 'all') {
        filters.action = params.action;
      }

      if (params.contentType && params.contentType !== 'all') {
        filters.contentType = params.contentType;
      }

      if (params.search) {
        const searchTerm = params.search.trim();
        filters.$or = [
          { userEmail: { $containsi: searchTerm } },
          { userName: { $containsi: searchTerm } },
          { targetDocumentId: { $containsi: searchTerm } },
          { contentType: { $containsi: searchTerm } },
          { clientId: { $containsi: searchTerm } },
          { location: { $containsi: searchTerm } },
        ];
      }

      if (params.startDate || params.endDate) {
        filters.createdAt = {};
        if (params.startDate) {
          filters.createdAt.$gte = new Date(params.startDate).toISOString();
        }
        if (params.endDate) {
          const endDateObj = new Date(params.endDate);
          endDateObj.setHours(23, 59, 59, 999);
          filters.createdAt.$lte = endDateObj.toISOString();
        }
      }

      const results = await (strapi.db.query('api::audit-log.audit-log') as any).findMany({
        where: filters,
        orderBy: { createdAt: 'desc' },
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });

      const total = await (strapi.db.query('api::audit-log.audit-log') as any).count({
        where: filters,
      });

      return {
        data: results,
        pagination: {
          page,
          pageSize,
          pageCount: Math.ceil(total / pageSize) || 1,
          total,
        },
      };
    } catch (err) {
      strapi.log.error('AuditLogService: Error finding audit logs:', err);
      return { data: [], pagination: { page: 1, pageSize: 20, pageCount: 0, total: 0 } };
    }
  },

  /**
   * Get distinct content types for filter dropdown
   */
  async getDistinctContentTypes() {
    try {
      const logs = await (strapi.db.query('api::audit-log.audit-log') as any).findMany({
        select: ['contentType'],
        limit: 5000,
      });
      const types = Array.from(new Set((logs || []).map((l: any) => l.contentType).filter(Boolean)));
      return types.sort();
    } catch (err) {
      strapi.log.error('AuditLogService: Error fetching content types:', err);
      return [];
    }
  },

  /**
   * Export matching audit logs for JSON download
   */
  async exportLogs(params: any = {}) {
    try {
      const filters: any = {};

      if (params.action && params.action !== 'all') {
        filters.action = params.action;
      }

      if (params.contentType && params.contentType !== 'all') {
        filters.contentType = params.contentType;
      }

      if (params.search) {
        const searchTerm = params.search.trim();
        filters.$or = [
          { userEmail: { $containsi: searchTerm } },
          { userName: { $containsi: searchTerm } },
          { targetDocumentId: { $containsi: searchTerm } },
          { contentType: { $containsi: searchTerm } },
          { clientId: { $containsi: searchTerm } },
          { location: { $containsi: searchTerm } },
        ];
      }

      if (params.startDate || params.endDate) {
        filters.createdAt = {};
        if (params.startDate) {
          filters.createdAt.$gte = new Date(params.startDate).toISOString();
        }
        if (params.endDate) {
          const endDateObj = new Date(params.endDate);
          endDateObj.setHours(23, 59, 59, 999);
          filters.createdAt.$lte = endDateObj.toISOString();
        }
      }

      const results = await (strapi.db.query('api::audit-log.audit-log') as any).findMany({
        where: filters,
        orderBy: { createdAt: 'desc' },
        limit: 10000,
      });

      return (results || []).map((log: any) => ({
        id: log.targetDocumentId || log.id,
        user: {
          name: log.userName,
          email: log.userEmail,
        },
        action: log.action,
        contentType: log.contentType,
        targetDocumentId: log.targetDocumentId,
        updatedFields: log.updatedFields || [],
        device: {
          ipAddress: log.ipAddress,
          clientId: log.clientId,
          location: log.location,
          browser: log.browser,
          os: log.os,
          deviceType: log.deviceType,
        },
        timestamp: log.createdAt,
      }));
    } catch (err) {
      strapi.log.error('AuditLogService: Error exporting audit logs:', err);
      return [];
    }
  },

  /**
   * Delete a single audit log by numeric DB id
   */
  async deleteLog(id: number) {
    try {
      await (strapi.db.query('api::audit-log.audit-log') as any).delete({
        where: { id },
      });
    } catch (err) {
      strapi.log.error('AuditLogService: Failed to delete audit log:', err);
      throw err;
    }
  },

  /**
   * Delete all audit logs (or filtered by action / contentType / date range)
   */
  async deleteAllLogs(params: any = {}) {
    try {
      const filters: any = {};

      if (params.action && params.action !== 'all') {
        filters.action = params.action;
      }
      if (params.contentType && params.contentType !== 'all') {
        filters.contentType = params.contentType;
      }
      if (params.startDate || params.endDate) {
        filters.createdAt = {};
        if (params.startDate) {
          filters.createdAt.$gte = new Date(params.startDate).toISOString();
        }
        if (params.endDate) {
          const endDateObj = new Date(params.endDate);
          endDateObj.setHours(23, 59, 59, 999);
          filters.createdAt.$lte = endDateObj.toISOString();
        }
      }

      const count = await (strapi.db.query('api::audit-log.audit-log') as any).count({
        where: filters,
      });

      await (strapi.db.query('api::audit-log.audit-log') as any).deleteMany({
        where: filters,
      });

      return count;
    } catch (err) {
      strapi.log.error('AuditLogService: Failed to delete all audit logs:', err);
      throw err;
    }
  },
}));
