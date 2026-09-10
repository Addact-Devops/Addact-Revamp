export const SITEMAP_BANNER_FIELDS = `
  banner {
    Banner {
      ... on ComponentBannerBanner {
        ...HeroBannerFields
      }
    }
  }
`;

export type SitemapBannerType = {
  BannerTitle?: string;
  BannerDescription?: string;
  BannerImage?: {
    url?: string;
    width?: number;
    height?: number;
    alternativeText?: string | null;
  } | null;
};

export type SitemapResponse = {
  sitemap?: {
    banner?: {
      Banner?: SitemapBannerType[];
    };
  };
};
