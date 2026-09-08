import { PROMO_INNER_FIELDS } from "./promoFragment";

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

