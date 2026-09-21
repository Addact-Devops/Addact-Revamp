import { BLOG_HERO_BANNER_FIELDS, type BlogBannerItem } from "./blogHeroBannerFieldsFragment";
import type { BaseHeading } from "./baseHeadingFragment";
import { CATEGORY_INNER_FIELDS, type BlogCategoryItem } from "./blogCategoryFragment";

export const BLOG_CARD_FIELDS = `
  Slug
  documentId
  HeadingSection {
    ... on ComponentBaseTemplateCommonSection { ...CommonSectionFields }
  }
  ${BLOG_HERO_BANNER_FIELDS}
  blog_category {
    ${CATEGORY_INNER_FIELDS}
  }
`;

export type BlogCardItem = {
  Slug: string;
  documentId: string;
  HeadingSection?: Partial<BaseHeading>[];
  BlogBanner?: BlogBannerItem[];
  blog_category?: BlogCategoryItem;
};

export type BlogCardType = BlogCardItem;

