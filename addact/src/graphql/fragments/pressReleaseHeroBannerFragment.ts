import { HERO_BANNER_FIELDS } from "./heroBannerFragment";
import type { BannerSection } from "./componentBannerFieldsFragment";
import type { BlogHeroBannerItem } from "./blogHeroBannerFragment";

export const PRESS_RELEASE_HERO_BANNER_FIELDS = HERO_BANNER_FIELDS;

export type PressReleaseHeroBannerType = {
  HeroBanner: BannerSection;
};

export type AddactPressReleaseItem = {
  Slug: string;
  HeroBanner: BlogHeroBannerItem[];
  PressReleaseSummary: string;
};




