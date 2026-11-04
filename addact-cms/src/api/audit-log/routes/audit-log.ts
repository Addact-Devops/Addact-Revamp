export default {
  routes: [
    {
      method: 'GET',
      path: '/audit-logs/logs',
      handler: 'api::audit-log.audit-log.findLogs',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/audit-logs/content-types',
      handler: 'api::audit-log.audit-log.getContentTypes',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/audit-logs/export',
      handler: 'api::audit-log.audit-log.exportLogs',
      config: { auth: false },
    },
    {
      method: 'DELETE',
      path: '/audit-logs/logs/:id',
      handler: 'api::audit-log.audit-log.deleteLog',
      config: { auth: false },
    },
    {
      method: 'DELETE',
      path: '/audit-logs/logs',
      handler: 'api::audit-log.audit-log.deleteAllLogs',
      config: { auth: false },
    },
  ],
};
