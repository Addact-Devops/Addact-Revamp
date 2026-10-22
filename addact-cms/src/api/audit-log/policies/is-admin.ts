import { getAdminUser, isAdminOrSuperAdmin } from '../controllers/admin-2fa';

/**
 * Policy to authorize only Admin or Super Admin users on privileged 2FA operations.
 */
export default async (policyContext: any, config: any, { strapi }: { strapi: any }) => {
  let user = policyContext.state.user;
  if (!user) {
    user = await getAdminUser(policyContext, strapi);
    if (user) {
      policyContext.state.user = user;
    }
  }

  if (!user || !isAdminOrSuperAdmin(user)) {
    return false;
  }

  return true;
};
