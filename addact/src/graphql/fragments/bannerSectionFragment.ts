import { COMPONENT_BANNER_FIELDS } from "./componentBannerFieldsFragment";
import { BANNER_CHIPS_TEXT_FIELDS } from "./bannerChipsTextFragment";

export const BANNER_SECTION_FIELDS = `
  Banner {
    Banner {
      ... on ComponentBannerBanner {
        ${COMPONENT_BANNER_FIELDS}
        ${BANNER_CHIPS_TEXT_FIELDS}
      }
    }
  }
`;
