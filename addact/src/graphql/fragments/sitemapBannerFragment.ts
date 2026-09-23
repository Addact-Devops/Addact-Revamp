import { BANNER_HERO_SECTION_FIELDS, type HeroBannerFragmentType } from "./heroBannerFragment";

export const SITEMAP_BANNER_FIELDS = BANNER_HERO_SECTION_FIELDS;

export type SitemapBannerType = HeroBannerFragmentType;


export type SitemapResponse = {
  sitemap?: {
    banner?: {
      Banner?: SitemapBannerType[];
    };
  };
};

