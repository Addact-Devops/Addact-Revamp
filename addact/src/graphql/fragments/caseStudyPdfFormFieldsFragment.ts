import { FORM_BASIC_LABELS_FIELDS, type FormBasicLabels } from "./contactUsFormLabelsFragment";
import type { ImageFragmentType } from "./imageFragment";

export const CASE_STUDY_PDF_FORM_FIELDS = `
  CaseStudyPDF {
    ...ImageFields
  }
  FormFields {
    ${FORM_BASIC_LABELS_FIELDS}
  }
`;

export type CaseStudyPDFItem = ImageFragmentType;
export type CaseStudyFormFieldsItem = FormBasicLabels;

export type CaseStudyPdfFormFieldsType = {
  CaseStudyPDF?: CaseStudyPDFItem;
  FormFields?: CaseStudyFormFieldsItem;
};

