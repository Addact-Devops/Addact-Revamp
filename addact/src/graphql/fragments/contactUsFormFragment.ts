import { PROMO_INNER_FIELDS } from "./promoFragment";
// Re-using CONTACTUS type from homeContactUsFragment to avoid duplicate type definitions
import { type CONTACTUS, type ContactUsFormItem } from "./homeContactUsFragment";

export const CONTACT_US_FORM_FIELDS = `
  contactus {
    Form {
      ... on ComponentBaseTemplatePromo {
        ${PROMO_INNER_FIELDS}
      }
    }
    pageReference
    RecipientEmails
  }
`;

export type { CONTACTUS, ContactUsFormItem };

export type ContactUsFormType = {
  contactus: CONTACTUS;
};
