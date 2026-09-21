import { COMPONENT_HERO_BANNER_SEARCHBOX_FIELDS, type HeroBannerFragmentType } from "./heroBannerFragment";
import { BLOG_CONTENT_ERROR_FIELDS, type ContentError } from "./blogContentErrorFragment";

export const BLOG_PAGE_BANNER_FIELDS = `
  blogBanner {
    Banner {
      ${COMPONENT_HERO_BANNER_SEARCHBOX_FIELDS}
      ${BLOG_CONTENT_ERROR_FIELDS}
    }
  }
`;

export type BlogPageBannerItem = HeroBannerFragmentType & Partial<ContentError> & {
  id?: string;
  show_searchbox?: boolean;
};

export type BlogPageBannerType = {
  blogBanner?: {
    Banner: BlogPageBannerItem[];
  };
};


