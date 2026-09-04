import { BLOG_HERO_BANNER_READ_NOW_FIELDS } from "./blogHeroBannerReadNowFragment";
import { BLOG_HERO_BANNER_AUTHOR_FIELDS } from "./blogHeroBannerAuthorFragment";
import { BLOG_CATEGORY_FIELDS } from "./blogCategoryFragment";

export const BLOG_SIMILAR_BLOGS_FIELDS = `
  similarBlogs {
    BlogBanner {
      ... on ComponentBlogHeroBannerBlogHeroBanner {
        BannerTitle
        BannerImage {
          ...ImageFields
        }
        PublishDate
        ${BLOG_HERO_BANNER_READ_NOW_FIELDS}
        ${BLOG_HERO_BANNER_AUTHOR_FIELDS}
        ${BLOG_CATEGORY_FIELDS}
      }
    }
  }
`;
