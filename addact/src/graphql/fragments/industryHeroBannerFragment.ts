import {
  COMPONENT_HERO_BANNER_SECTION_FIELDS,
  type BannerItem,
} from "./componentBannerFieldsFragment";

export const INDUSTRY_HERO_BANNER_FIELDS = COMPONENT_HERO_BANNER_SECTION_FIELDS;

export type IndustryHeroBannerItem = BannerItem;

export type IndustryHeroBannerType = {
  HeroBanner?: {
    Banner?: IndustryHeroBannerItem[];
  };
};




