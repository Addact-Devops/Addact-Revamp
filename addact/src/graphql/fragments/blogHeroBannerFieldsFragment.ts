import { BLOG_HERO_BANNER_READ_NOW_FIELDS } from "./blogHeroBannerReadNowFragment";
import { BLOG_HERO_BANNER_AUTHOR_FIELDS } from "./blogHeroBannerAuthorFragment";
import { BLOG_CATEGORY_FIELDS } from "./blogCategoryFragment";
import { BLOG_HERO_BANNER_INNER_FIELDS } from "./blogHeroBannerFragment";

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
