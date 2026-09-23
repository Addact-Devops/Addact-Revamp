import { CASE_STUDY_PDF_FIELDS } from "./caseStudyPdfFragment";
import { CASE_STUDY_FORM_FIELDS } from "./caseStudyFormFragment";
import type { ImageFragmentType } from "./imageFragment";
import type { FormBasicLabels } from "./contactUsFormLabelsFragment";

export const CASE_STUDY_PDF_FORM_FIELDS = `
  ${CASE_STUDY_PDF_FIELDS}
  ${CASE_STUDY_FORM_FIELDS}
`;

export type CaseStudyPDFItem = ImageFragmentType;
export type CaseStudyFormFieldsItem = FormBasicLabels;

export type CaseStudyPdfFormFieldsType = {
  CaseStudyPDF?: CaseStudyPDFItem;
  FormFields?: CaseStudyFormFieldsItem;
};

