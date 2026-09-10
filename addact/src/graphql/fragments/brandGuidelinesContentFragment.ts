import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { BLOG_CONTENT_SHARED_LINK_FIELDS } from "./blogContentSharedLinkFragment";
import { type BrandGuidelinesFormFieldsItem } from "./brandGuidelinesFormFragment";
import { type PageHeroBannerType } from "./pageHeroBannerFragment";
import type { Heading } from "@/types/common";

export const BRAND_GUIDELINES_CONTENT_FIELDS = `
  Content {
    ${BLOG_CONTENT_HEADINGS_FIELDS}
    ... on ComponentBaseTemplateRichtext { ...RichtextFields }
    ... on ComponentSharedImage { ...SharedImageFields }
    ${BLOG_CONTENT_SHARED_LINK_FIELDS}
  }
`;

export type BrandGuidelinesResponse = {
  brandGuideline: PageHeroBannerType & BrandGuidelinesFormFieldsItem & {
    ReferenceTitle: string;
    Slug: string;
    Content: Heading[];
    GuidelinePDF: {
      alternativeText: string;
      url: string;
    };
  };
};
