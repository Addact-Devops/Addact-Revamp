export default {
  routes: [
    {
      method: 'GET',
      path: '/admin-2fa/status',
      handler: 'api::audit-log.admin-2fa.getStatus',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/admin-2fa/setup',
      handler: 'api::audit-log.admin-2fa.setup2FA',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/admin-2fa/enable',
      handler: 'api::audit-log.admin-2fa.enable2FA',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/admin-2fa/verify-login',
      handler: 'api::audit-log.admin-2fa.verifyLogin2FA',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/admin-2fa/disable',
      handler: 'api::audit-log.admin-2fa.disable2FA',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/admin-2fa/regenerate-codes',
      handler: 'api::audit-log.admin-2fa.regenerateRecoveryCodes',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/admin-2fa/users-overview',
      handler: 'api::audit-log.admin-2fa.getUsersOverview',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/admin-2fa/admin-reset-user',
      handler: 'api::audit-log.admin-2fa.adminResetUser2FA',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/admin-2fa/admin-regenerate-codes',
      handler: 'api::audit-log.admin-2fa.adminRegenerateUserRecoveryCodes',
      config: { auth: false },
    },
  ],
};
