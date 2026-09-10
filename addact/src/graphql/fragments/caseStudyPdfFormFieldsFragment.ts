import { CASE_STUDY_PDF_FIELDS } from "./caseStudyPdfFragment";
import { CASE_STUDY_FORM_FIELDS } from "./caseStudyFormFragment";

export const CASE_STUDY_PDF_FORM_FIELDS = `
  ${CASE_STUDY_PDF_FIELDS}
  ${CASE_STUDY_FORM_FIELDS}
`;

export type CaseStudyPDFItem = {
  url: string;
  width: string;
  name: string;
  height: string;
};

export type CaseStudyFormFieldsItem = {
  NameLable: string;
  EmailLabel: string;
  PhoneLabel: string;
  ButtonLabel: string;
  RecipientEmails: string;
};

export type CaseStudyPdfFormFieldsType = {
  CaseStudyPDF: CaseStudyPDFItem;
  FormFields: CaseStudyFormFieldsItem;
};
