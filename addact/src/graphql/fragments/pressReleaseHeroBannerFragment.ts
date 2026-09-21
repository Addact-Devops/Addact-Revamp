import { COMPONENT_HERO_BANNER_FIELDS, type HeroBannerFragmentType } from "./heroBannerFragment";
import { type BlogHeroBannerItem } from "./blogHeroBannerFragment";

export const PRESS_RELEASE_HERO_BANNER_FIELDS = `
  HeroBanner {
    Banner {
      ${COMPONENT_HERO_BANNER_FIELDS}
    }
  }
`;

export type PressReleaseHeroBannerType = {
  HeroBanner: {
    Banner: HeroBannerFragmentType[];
  };
};

export type AddactPressReleaseItem = {
  Slug: string;
  HeroBanner: BlogHeroBannerItem[];
  PressReleaseSummary: string;
};



