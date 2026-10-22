import { getAdminUser } from '../controllers/admin-2fa';

/**
 * Policy to authenticate Strapi admin users on 2FA API endpoints.
 * Validates the admin JWT token via Strapi's admin::token service and cryptographic verification.
 */
export default async (policyContext: any, config: any, { strapi }: { strapi: any }) => {
  const user = await getAdminUser(policyContext, strapi);
  if (!user) {
    return false;
  }
  policyContext.state.user = user;
  return true;
};
