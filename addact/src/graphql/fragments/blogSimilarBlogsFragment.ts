import { BLOG_HERO_BANNER_FIELDS } from "./blogHeroBannerFieldsFragment";

export const BLOG_SIMILAR_BLOGS_FIELDS = `
  similarBlogs {
    ${BLOG_HERO_BANNER_FIELDS}
  }
`;

export type BlogSimilarBlogItem = {
  BlogBanner?: {
    BannerTitle?: string;
    PublishDate?: string;
    BannerImage?: {
      alternativeText?: string;
      name?: string;
      url?: string;
      width?: number;
      height?: number;
    };
    ReadNow?: {
      id?: string;
      href?: string;
      label?: string;
      target?: string;
      isExternal?: boolean;
    };
    author?: {
      Author?: {
        AuthorName?: string;
      };
    };
    blogcategory?: {
      Category?: {
        CategoryTitle?: string;
      };
    };
  }[];
};

export type BlogSimilarBlogsType = {
  similarBlogs?: BlogSimilarBlogItem[];
};

