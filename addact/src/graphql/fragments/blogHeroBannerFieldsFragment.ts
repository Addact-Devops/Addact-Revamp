import { BLOG_HERO_BANNER_READ_NOW_FIELDS, type ReadNow } from "./blogHeroBannerReadNowFragment";
import { BLOG_HERO_BANNER_AUTHOR_FIELDS, type BannerAuthor } from "./blogHeroBannerAuthorFragment";
import { BLOG_CATEGORY_FIELDS, type BlogCategory } from "./blogCategoryFragment";
import { BLOG_HERO_BANNER_INNER_FIELDS, type BlogHeroBannerItem } from "./blogHeroBannerFragment";

export const BLOG_HERO_BANNER_FIELDS = `
  BlogBanner {
    ... on ComponentBlogHeroBannerBlogHeroBanner {
      ${BLOG_HERO_BANNER_INNER_FIELDS}
      ${BLOG_HERO_BANNER_READ_NOW_FIELDS}
      ${BLOG_HERO_BANNER_AUTHOR_FIELDS}
      ${BLOG_CATEGORY_FIELDS}
    }
  }
`;

// Composite type merging all 4 sub-fragment shapes
export type BlogBannerItem = BlogHeroBannerItem
  & ReadNow
  & BannerAuthor
  & BlogCategory;

export type BlogBanner = {
  BlogBanner: BlogBannerItem[];
};

export type BlogBySlugBannerItem = {
  BannerTitle?: string;
  BannerDescription?: string;
  BannerImage?: {
    alternativeText?: string;
    height?: number;
    name?: string;
    url?: string;
    width?: number;
  };
  PublishDate?: string;
  ReadNow?: {
    id?: string;
    href?: string;
    label?: string;
    target?: string;
    isExternal?: boolean;
  };
  author?: { Author?: { AuthorName?: string } };
  blogcategory?: { Category?: { CategoryTitle?: string } };
};


