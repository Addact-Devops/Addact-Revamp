import { ImageFragmentType } from "./imageFragment";

export type BrandGuidelinesPdfType = {
  GuidelinePDF?: ImageFragmentType;
};

export const BRAND_GUIDELINES_PDF_FIELDS = `
  GuidelinePDF {
    ...ImageFields
  }
`;


