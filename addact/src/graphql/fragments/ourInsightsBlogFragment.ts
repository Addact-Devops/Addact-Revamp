import { BLOG_HERO_BANNER_FIELDS, type BlogBannerItem } from "./blogHeroBannerFieldsFragment";
import type { BaseHeading } from "./baseHeadingFragment";
import type { SlugType } from "@/types/common";

export const OUR_INSIGHTS_BLOG_FIELDS = `
  addactBlogs(pagination: { page: 1, pageSize: 2 }, sort: ["publishedAt:desc"]) {
    documentId
    Slug
    createdAt
    HeadingSection {
      ... on ComponentBaseTemplateCommonSection { ...CommonSectionFields }
    }
    ${BLOG_HERO_BANNER_FIELDS}
  }
`;

export type AddactBlog = Required<SlugType> & {
  documentId: string;
  createdAt: string;
  HeadingSection: Partial<BaseHeading>[];
  BlogBanner: BlogBannerItem[];
};

export type OurInsightsBlogType = {
  addactBlogs: AddactBlog[];
};
