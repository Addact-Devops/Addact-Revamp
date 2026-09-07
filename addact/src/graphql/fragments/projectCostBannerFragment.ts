import { BANNER_TITLE_DESCRIPTION_FIELDS } from "./componentBannerFieldsFragment";

export const PROJECT_COST_BANNER_FIELDS = `
  banner {
    Banner {
      ... on ComponentBannerBanner {
        BannerImage {
          ...ImageFields
        }
        ${BANNER_TITLE_DESCRIPTION_FIELDS}
        BannerLogo {
          ...ImageFields
        }
      }
    }
  }
`;


