import { COMPONENT_HERO_BANNER_FIELDS, type HeroBannerFragmentType } from "./heroBannerFragment";

export const SITEMAP_BANNER_FIELDS = `
  banner {
    Banner {
      ${COMPONENT_HERO_BANNER_FIELDS}
    }
  }
`;

export type SitemapBannerType = HeroBannerFragmentType;

export type SitemapResponse = {
  sitemap?: {
    banner?: {
      Banner?: SitemapBannerType[];
    };
  };
};

