import { ImageFragmentType } from "./imageFragment";

export type CaseStudyPdfType = {
  CaseStudyPDF?: ImageFragmentType;
};

export const CASE_STUDY_PDF_FIELDS = `
  CaseStudyPDF {
    ...ImageFields
  }
`;

