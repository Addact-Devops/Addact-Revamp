import { HEADING_INLINE_FIELDS } from "./headingFragment";
import { BLOG_CONTENT_SHARED_LINK_FIELDS } from "./blogContentSharedLinkFragment";
import type { ImageFragmentType } from "./imageFragment";
import type { FormBasicLabels } from "./contactUsFormLabelsFragment";
import type { PageHeroBannerType } from "./pageHeroBannerFragment";
import type { BlogContentItem } from "./blogContentFragment";
import type { SlugType } from "@/types/common";

export type BrandGuidelinesPdfType = {
  GuidelinePDF?: ImageFragmentType;
};

export type BrandGuidelinesFormFieldsItem = {
  FromTitle: string;
  FormFileds: FormBasicLabels;
};

export const BRAND_GUIDELINES_CONTENT_FIELDS = `
  Content {
    ${HEADING_INLINE_FIELDS}
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


