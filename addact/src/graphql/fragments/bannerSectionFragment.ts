import {
  COMPONENT_BANNER_INNER_FIELDS,
  type BannerSection,
  type BannerItem,
  type BannerLink,
} from "./componentBannerFieldsFragment";
import { BANNER_CHIPS_TEXT_FIELDS, type ChipsTextItem, type ChipsText } from "./bannerChipsTextFragment";

export const BANNER_SECTION_FIELDS = `
  Banner {
    Banner {
      ... on ComponentBannerBanner {
        ${COMPONENT_BANNER_INNER_FIELDS}
        ${BANNER_CHIPS_TEXT_FIELDS}
      }
    }
  }
`;

export type { ChipsTextItem, ChipsText, BannerSection, BannerItem, BannerLink };

