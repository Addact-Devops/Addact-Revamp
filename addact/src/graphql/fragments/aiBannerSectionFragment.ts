import { COMPONENT_BANNER_FIELDS } from "./componentBannerFieldsFragment";

export const AI_BANNER_SECTION_FIELDS = `
  Banner {
    Banner {
      ... on ComponentBannerBanner {
        ${COMPONENT_BANNER_FIELDS}
      }
    }
  }
`;
