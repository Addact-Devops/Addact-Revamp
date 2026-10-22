import { factories } from '@strapi/strapi';

export interface ChangeDetail {
  field: string;
  before: string | null;
  after: string | null;
}

export interface CreateAuditLogPayload {
  userName?: string;
  userEmail?: string;
  action: 'Create' | 'Update' | 'Delete' | 'Publish' | 'Unpublish' | 'Login' | 'Logout';
  contentType?: string;
  targetDocumentId?: string;
  updatedFields?: string[];       // plain field names (legacy & Delete/Publish)
  changeDetails?: ChangeDetail[]; // rich before/after (Update action)
  ipAddress?: string;
  clientId?: string;
  location?: string;
  browser?: string;
  os?: string;
  deviceType?: string;
  systemUser?: string;
}

function parseAndValidateDate(dateStr: any, paramName: string): Date | null {
  if (!dateStr) return null;
  const str = String(dateStr).trim();
  if (!str) return null;
  const timestamp = Date.parse(str);
  if (isNaN(timestamp)) {
    const error: any = new Error(`Invalid date format for '${paramName}': "${dateStr}". Expected a valid ISO-8601 date (e.g. YYYY-MM-DD).`);
    error.status = 400;
    error.name = 'ValidationError';
    throw error;
  }
  return new Date(timestamp);
}

export default factories.createCoreService('api::audit-log.audit-log' as any, ({ strapi }) => ({
  /**
   * Fail-safe log creation.
   * For Update actions: stores ChangeDetail[] in updatedFields (rich format).
   * For all other actions: stores string[] in updatedFields (legacy format).
   * Both fit the existing `updatedFields` JSON column — no migration needed.
   */
  async createLog(payload: CreateAuditLogPayload) {
    try {
      // Decide what to store in the JSON `updatedFields` column:
      // • If changeDetails provided → store rich objects [{field, before, after}]
      // • Else if updatedFields provided → store plain strings ["fieldName"]
      // • Else → null
      let fieldsToStore: any = null;
      if (payload.changeDetails && payload.changeDetails.length > 0) {
        fieldsToStore = payload.changeDetails; // rich objects
      } else if (payload.updatedFields && payload.updatedFields.length > 0) {
        fieldsToStore = payload.updatedFields; // plain strings
      }

      await (strapi.documents('api::audit-log.audit-log' as any) as any).create({
        data: {
          userName: payload.userName || 'Unknown User',
          userEmail: payload.userEmail || 'N/A',
          action: payload.action,
          contentType: payload.contentType || 'N/A',
          targetDocumentId: payload.targetDocumentId || null,
          updatedFields: fieldsToStore,
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
      const page = Math.max(1, parseInt(params.page, 10) || 1);
      // Enforce reasonable pagination limit between 1 and 100 (default: 20)
      const pageSize = Math.min(100, Math.max(1, parseInt(params.pageSize, 10) || 20));
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

      let startDateObj: Date | null = null;
      let endDateObj: Date | null = null;

      if (params.startDate) {
        startDateObj = parseAndValidateDate(params.startDate, 'startDate');
      }

      if (params.endDate) {
        endDateObj = parseAndValidateDate(params.endDate, 'endDate');
      }

      if (startDateObj && endDateObj && startDateObj.getTime() > endDateObj.getTime()) {
        const error: any = new Error(`'startDate' (${params.startDate}) cannot be after 'endDate' (${params.endDate}).`);
        error.status = 400;
        error.name = 'ValidationError';
        throw error;
      }

      if (startDateObj || endDateObj) {
        filters.createdAt = {};
        if (startDateObj) {
          filters.createdAt.$gte = startDateObj.toISOString();
        }
        if (endDateObj) {
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
    } catch (err: any) {
      if (err?.name === 'ValidationError' || err?.status === 400) {
        throw err;
      }
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
   * Export matching audit logs for JSON download with pagination and truncation transparency
   */
  async exportLogs(params: any = {}) {
    try {
      const page = Math.max(1, parseInt(params.page, 10) || 1);
      const pageSize = Math.min(10000, Math.max(1, parseInt(params.pageSize || params.limit, 10) || 10000));
      const offset = params.offset !== undefined ? Math.max(0, parseInt(params.offset, 10)) : (page - 1) * pageSize;

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

      let startDateObj: Date | null = null;
      let endDateObj: Date | null = null;

      if (params.startDate) {
        startDateObj = parseAndValidateDate(params.startDate, 'startDate');
      }

      if (params.endDate) {
        endDateObj = parseAndValidateDate(params.endDate, 'endDate');
      }

      if (startDateObj && endDateObj && startDateObj.getTime() > endDateObj.getTime()) {
        const error: any = new Error(`'startDate' (${params.startDate}) cannot be after 'endDate' (${params.endDate}).`);
        error.status = 400;
        error.name = 'ValidationError';
        throw error;
      }

      if (startDateObj || endDateObj) {
        filters.createdAt = {};
        if (startDateObj) {
          filters.createdAt.$gte = startDateObj.toISOString();
        }
        if (endDateObj) {
          endDateObj.setHours(23, 59, 59, 999);
          filters.createdAt.$lte = endDateObj.toISOString();
        }
      }

      const total = await (strapi.db.query('api::audit-log.audit-log') as any).count({
        where: filters,
      });

      const results = await (strapi.db.query('api::audit-log.audit-log') as any).findMany({
        where: filters,
        orderBy: { createdAt: 'desc' },
        limit: pageSize,
        offset,
      });

      const formattedLogs = (results || []).map((log: any) => ({
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

      const isTruncated = total > offset + formattedLogs.length;

      return {
        data: formattedLogs,
        pagination: {
          page,
          pageSize,
          pageCount: Math.ceil(total / pageSize) || 1,
          total,
          isTruncated,
          warning: isTruncated
            ? `Notice: Export contains ${formattedLogs.length} of ${total} total matching audit logs. To obtain the remaining records, use pagination parameters (?page=${page + 1}&pageSize=${pageSize}) or refine your date filter.`
            : null,
        },
      };
    } catch (err: any) {
      if (err?.name === 'ValidationError' || err?.status === 400) {
        throw err;
      }
      strapi.log.error('AuditLogService: Error exporting audit logs:', err);
      return {
        data: [],
        pagination: {
          page: 1,
          pageSize: 10000,
          pageCount: 0,
          total: 0,
          isTruncated: false,
          warning: null,
        },
      };
    }
  },

  /**
   * Automatically purge audit logs older than a given number of days (e.g. 30 days)
   */
  async autoPurgeOlderThanDays(days = 30) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      const cutoffIso = cutoffDate.toISOString();

      const filters = {
        createdAt: {
          $lt: cutoffIso,
        },
      };

      const count = await (strapi.db.query('api::audit-log.audit-log') as any).count({
        where: filters,
      });

      if (count > 0) {
        await (strapi.db.query('api::audit-log.audit-log') as any).deleteMany({
          where: filters,
        });
        strapi.log.info(`[AuditLog Auto-Purge] Cleaned up ${count} audit logs older than ${days} days (cutoff: ${cutoffIso}).`);
      }

      return count;
    } catch (err) {
      strapi.log.error(`[AuditLog Auto-Purge] Failed to purge logs older than ${days} days:`, err);
      return 0;
    }
  },
}));
