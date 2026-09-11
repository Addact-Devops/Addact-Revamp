import { COMPONENT_BANNER_FIELDS } from "./componentBannerFieldsFragment";
import { BANNER_CHIPS_TEXT_FIELDS, type ChipsTextItem, type ChipsText } from "./bannerChipsTextFragment";
export type { ChipsTextItem, ChipsText };
// Re-using BannerSection, BannerItem, BannerLink from developmentHeroBannerFragment to avoid duplicate type definitions
import { type BannerSection, type BannerItem, type BannerLink } from "./developmentHeroBannerFragment";

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

export type { BannerSection, BannerItem, BannerLink };

