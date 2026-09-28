import { COMPONENT_PROMO_FIELDS } from "./promoFragment";
// Re-using CONTACTUS type from homeContactUsFragment to avoid duplicate type definitions
import { type CONTACTUS, type ContactUsFormItem } from "./homeContactUsFragment";

export const CONTACT_US_FORM_FIELDS = `
  contactus {
    Form {
    ${COMPONENT_PROMO_FIELDS}
  }
  pageReference
  RecipientEmails
  }
`;

export type { CONTACTUS, ContactUsFormItem };

export type ContactUsFormType = {
  contactus: CONTACTUS;
};
