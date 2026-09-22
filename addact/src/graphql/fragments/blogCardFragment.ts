import { BLOG_HERO_BANNER_FIELDS, type BlogBannerItem } from "./blogHeroBannerFieldsFragment";
import type { BaseHeading } from "./baseHeadingFragment";
import { BLOG_CARD_CATEGORY_FIELDS, type BlogCategoryItem } from "./blogCategoryFragment";
import type { SlugType } from "@/types/common";

export const BLOG_CARD_FIELDS = `
  Slug
  documentId
  HeadingSection {
    ... on ComponentBaseTemplateCommonSection { ...CommonSectionFields }
  }
  ${BLOG_HERO_BANNER_FIELDS}
  ${BLOG_CARD_CATEGORY_FIELDS}
`;

export type BlogCardItem = Required<SlugType> & {
  documentId: string;
  HeadingSection?: Partial<BaseHeading>[];
  BlogBanner?: BlogBannerItem[];
  blog_category?: BlogCategoryItem;
};

export type BlogCardType = BlogCardItem;

