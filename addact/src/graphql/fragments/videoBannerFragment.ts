import { COMPONENT_HERO_BANNER_FIELDS, type HeroBannerFragmentType } from "./heroBannerFragment";

export const VIDEO_BANNER_FIELDS = `
  banner {
    Banner {
      ${COMPONENT_HERO_BANNER_FIELDS}
    }
  }
`;

export type VideoBannerType = HeroBannerFragmentType;

