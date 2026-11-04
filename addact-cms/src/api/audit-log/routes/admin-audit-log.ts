export default {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/custom-audit-logs/logs',
      handler: 'api::audit-log.audit-log.findLogs',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/custom-audit-logs/content-types',
      handler: 'api::audit-log.audit-log.getContentTypes',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/custom-audit-logs/export',
      handler: 'api::audit-log.audit-log.exportLogs',
      config: { auth: false },
    },
    {
      method: 'DELETE',
      path: '/custom-audit-logs/logs/:id',
      handler: 'api::audit-log.audit-log.deleteLog',
      config: { auth: false },
    },
    {
      method: 'DELETE',
      path: '/custom-audit-logs/logs',
      handler: 'api::audit-log.audit-log.deleteAllLogs',
      config: { auth: false },
    },
  ],
};
