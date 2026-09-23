import { COMPONENT_PROMO_FIELDS } from "./promoFragment";
// Re-using CONTACTUS type from homeContactUsFragment to avoid duplicate type definitions
import { type CONTACTUS, type ContactUsFormItem } from "./homeContactUsFragment";

export const CONTACT_US_FORM_INNER_FIELDS = `
  Form {
    ${COMPONENT_PROMO_FIELDS}
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

