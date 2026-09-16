import { COMPONENT_BANNER_FIELDS } from "./componentBannerFieldsFragment";
import type { BannerItem } from "./developmentHeroBannerFragment";

export type IndustryHeroBannerItem = BannerItem;

export type IndustryHeroBannerType = {
  HeroBanner?: {
    Banner?: IndustryHeroBannerItem[];
  };
};

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


