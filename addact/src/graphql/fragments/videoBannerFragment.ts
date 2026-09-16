export const VIDEO_BANNER_FIELDS = `
  banner {
    Banner {
      ... on ComponentBannerBanner {
        ...HeroBannerFields
      }
    }
  }
`;

export type VideoBannerType = {
  BannerTitle?: string;
  BannerDescription?: string;
  BannerImage?: {
    url?: string;
    width?: number;
    height?: number;
    alternativeText?: string | null;
  };
};
