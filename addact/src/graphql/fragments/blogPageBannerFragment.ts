export const BLOG_PAGE_BANNER_FIELDS = `
  blogBanner {
    Banner {
      ... on ComponentBannerBanner {
        id
        ...HeroBannerFields
        show_searchbox
      }
      ... on Error {
        code
        message
      }
    }
  }
`;

export type BlogPageBannerItem = {
  id?: string;
  BannerTitle?: string;
  BannerDescription?: string;
  BannerImage?: {
    width: number;
    url: string;
    name: string;
    height: number;
  };
  show_searchbox?: boolean;
  code?: string;
  message?: string;
};

export type BlogPageBannerType = {
  blogBanner?: {
    Banner: BlogPageBannerItem[];
  };
};

