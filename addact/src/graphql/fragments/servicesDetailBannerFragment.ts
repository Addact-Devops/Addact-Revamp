import { COMPONENT_BANNER_FIELDS } from "./componentBannerFieldsFragment";

export const SERVICES_DETAIL_BANNER_FIELDS = `
  Banner: banner {
    Banner {
      ... on ComponentBannerBanner {
        ${COMPONENT_BANNER_FIELDS}
        BannerLogo {
          ...ImageFields
        }
      }
    }
  }
`;
