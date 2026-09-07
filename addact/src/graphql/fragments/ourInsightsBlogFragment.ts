import { BLOG_HERO_BANNER_INNER_FIELDS } from "./blogHeroBannerFragment";
import { BLOG_HERO_BANNER_READ_NOW_FIELDS } from "./blogHeroBannerReadNowFragment";

export const OUR_INSIGHTS_BLOG_FIELDS = `
  addactBlogs(pagination: { page: 1, pageSize: 2 }, sort: ["publishedAt:desc"]) {
    documentId
    Slug
    createdAt
    HeadingSection {
      ... on ComponentBaseTemplateCommonSection { ...CommonSectionFields }
    }
    BlogBanner {
      ... on ComponentBlogHeroBannerBlogHeroBanner {
        id
        ${BLOG_HERO_BANNER_INNER_FIELDS}
        ${BLOG_HERO_BANNER_READ_NOW_FIELDS}
      }
    }
  }
`;
