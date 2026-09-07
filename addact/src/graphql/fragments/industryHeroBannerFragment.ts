import { COMPONENT_BANNER_FIELDS } from "./componentBannerFieldsFragment";

export const INDUSTRY_HERO_BANNER_FIELDS = `
  HeroBanner {
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

