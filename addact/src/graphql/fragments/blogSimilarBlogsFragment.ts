import { BLOG_HERO_BANNER_FIELDS, type BlogBannerItem } from "./blogHeroBannerFieldsFragment";

export const BLOG_SIMILAR_BLOGS_FIELDS = `
  similarBlogs {
    ${BLOG_HERO_BANNER_FIELDS}
  }
`;

export type BlogSimilarBlogItem = {
  BlogBanner?: BlogBannerItem[];
};

export type BlogSimilarBlogsType = {
  similarBlogs?: BlogSimilarBlogItem[];
};


