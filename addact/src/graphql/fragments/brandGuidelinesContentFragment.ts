import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { BLOG_CONTENT_SHARED_LINK_FIELDS } from "./blogContentSharedLinkFragment";
import type { BrandGuidelinesFormFieldsItem } from "./brandGuidelinesFormFragment";
import type { PageHeroBannerType } from "./pageHeroBannerFragment";
import type { BrandGuidelinesPdfType } from "./brandGuidelinesPdfFragment";
import type { BlogContentItem } from "./blogContentFragment";
import type { SlugType } from "@/types/common";

export const BRAND_GUIDELINES_CONTENT_FIELDS = `
  Content {
    ${BLOG_CONTENT_HEADINGS_FIELDS}
    ... on ComponentBaseTemplateRichtext { ...RichtextFields }
    ... on ComponentSharedImage { ...SharedImageFields }
    ${BLOG_CONTENT_SHARED_LINK_FIELDS}
  }
`;

export type BrandGuidelinesItem = PageHeroBannerType &
  BrandGuidelinesFormFieldsItem &
  Partial<BrandGuidelinesPdfType> &
  SlugType & {
    ReferenceTitle?: string;
    Content?: BlogContentItem[];
  };

export type BrandGuidelinesResponse = {
  brandGuideline: BrandGuidelinesItem;
};

