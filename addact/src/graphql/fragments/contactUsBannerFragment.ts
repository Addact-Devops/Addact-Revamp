import { COMPONENT_BANNER_FIELDS } from "./componentBannerFieldsFragment";

export const CONTACT_US_BANNER_FIELDS = `
  banner {
    Banner {
      ... on ComponentBannerBanner {
        ${COMPONENT_BANNER_FIELDS}
      }
    }
  }
`;
