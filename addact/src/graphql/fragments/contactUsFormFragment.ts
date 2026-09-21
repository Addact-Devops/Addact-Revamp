import { PROMO_INNER_FIELDS } from "./promoFragment";
// Re-using CONTACTUS type from homeContactUsFragment to avoid duplicate type definitions
import { type CONTACTUS, type ContactUsFormItem } from "./homeContactUsFragment";

export const CONTACT_US_FORM_INNER_FIELDS = `
  Form {
    ... on ComponentBaseTemplatePromo {
      ${PROMO_INNER_FIELDS}
    }
  }
  pageReference
  RecipientEmails
`;

export const CONTACT_US_FORM_FIELDS = `
  contactus {
    ${CONTACT_US_FORM_INNER_FIELDS}
  }
`;

export type { CONTACTUS, ContactUsFormItem };

export type ContactUsFormType = {
  contactus: CONTACTUS;
};

