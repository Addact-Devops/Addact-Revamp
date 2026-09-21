import { FORM_BASIC_LABELS_FIELDS, type FormBasicLabels } from "./contactUsFormLabelsFragment";

export const BRAND_GUIDELINES_FORM_FIELDS = `
  FromTitle
  FormFileds {
    ${FORM_BASIC_LABELS_FIELDS}
  }
`;

export type BrandGuidelinesFormFieldsItem = {
  FromTitle: string;
  FormFileds: FormBasicLabels;
};

