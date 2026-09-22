import { BLOG_HERO_BANNER_READ_NOW_FIELDS, type ReadNow } from "./blogHeroBannerReadNowFragment";
import { BLOG_HERO_BANNER_AUTHOR_FIELDS, type BannerAuthor } from "./blogHeroBannerAuthorFragment";
import { BLOG_CATEGORY_FIELDS, type BlogCategory } from "./blogCategoryFragment";
import { BLOG_HERO_BANNER_INNER_FIELDS, type BlogHeroBannerItem } from "./blogHeroBannerFragment";

export const BLOG_HERO_BANNER_FULL_INNER_FIELDS = `
  ${BLOG_HERO_BANNER_INNER_FIELDS}
  ${BLOG_HERO_BANNER_READ_NOW_FIELDS}
  ${BLOG_HERO_BANNER_AUTHOR_FIELDS}
  ${BLOG_CATEGORY_FIELDS}
`;

export const COMPONENT_BLOG_HERO_BANNER_FULL_FIELDS = `
  ... on ComponentBlogHeroBannerBlogHeroBanner {
    ${BLOG_HERO_BANNER_FULL_INNER_FIELDS}
  }
`;

export const BLOG_HERO_BANNER_FIELDS = `
  BlogBanner {
    ${COMPONENT_BLOG_HERO_BANNER_FULL_FIELDS}
  }
`;

export const HERO_BANNER_FULL_FIELDS = `
  HeroBanner {
    ${COMPONENT_BLOG_HERO_BANNER_FULL_FIELDS}
  }
`;

// Composite type merging all 4 sub-fragment shapes directly
export type BlogBySlugBannerItem = Partial<BlogHeroBannerItem> &
  ReadNow &
  BannerAuthor &
  BlogCategory;

export type BlogBannerItem = BlogBySlugBannerItem;

export type BlogBanner = {
  BlogBanner: BlogBannerItem[];
};
