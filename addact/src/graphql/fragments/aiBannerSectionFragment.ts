import { COMPONENT_BANNER_FIELDS } from "./componentBannerFieldsFragment";
// Re-using BannerSection, BannerItem, BannerLink from developmentHeroBannerFragment to avoid duplicate type definitions
import { type BannerSection, type BannerItem, type BannerLink } from "./developmentHeroBannerFragment";

export const AI_BANNER_SECTION_FIELDS = `
  Banner {
    Banner {
      ... on ComponentBannerBanner {
        ${COMPONENT_BANNER_FIELDS}
      }
    }
  }
`;

export type { BannerSection, BannerItem, BannerLink };

export type AiBannerSectionType = {
  Banner: BannerSection;
};
