import { FORM_BASIC_LABELS_FIELDS } from "./contactUsFormLabelsFragment";

export const BRAND_GUIDELINES_FORM_FIELDS = `
  FromTitle
  FormFileds {
    ${FORM_BASIC_LABELS_FIELDS}
  }
`;

export type BrandGuidelinesFormFieldsItem = {
  FromTitle: string;
  FormFileds: {
    NameLable: string;
    EmailLabel: string;
    PhoneLabel: string;
    RecipientEmails: string;
    ButtonLabel: string;
  };
};
