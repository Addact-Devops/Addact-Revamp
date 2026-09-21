import {
  COMPONENT_BANNER_SECTION_FIELDS,
  type BannerSection,
  type BannerItem,
  type BannerLink,
} from "./componentBannerFieldsFragment";

export const DEVELOPMENT_HERO_BANNER_FIELDS = COMPONENT_BANNER_SECTION_FIELDS;

export type { BannerSection, BannerItem, BannerLink };

export type DevelopmentHeroBannerType = {
  Banner: BannerSection;
};

