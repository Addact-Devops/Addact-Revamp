import {
  COMPONENT_BANNER_SECTION_FIELDS,
  type ComponentBannerItem,
} from "./componentBannerFieldsFragment";

export const CAREERS_HERO_BANNER_FIELDS = COMPONENT_BANNER_SECTION_FIELDS;

export type CareersHeroBannerItem = ComponentBannerItem;

export type CareersHeroBanner = {
  Banner?: CareersHeroBannerItem[];
};

export type CareersHeroBannerType = {
  Banner: CareersHeroBanner;
};


