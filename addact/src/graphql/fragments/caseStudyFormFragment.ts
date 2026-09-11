import { FORM_BASIC_LABELS_FIELDS, type FormBasicLabels } from "./contactUsFormLabelsFragment";

export type CaseStudyFormFieldsType = {
  FormFields?: FormBasicLabels;
};

export const CASE_STUDY_FORM_FIELDS = `
  FormFields {
    ${FORM_BASIC_LABELS_FIELDS}
  }
`;


