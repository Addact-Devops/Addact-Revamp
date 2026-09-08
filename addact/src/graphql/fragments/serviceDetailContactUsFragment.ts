import { PROMO_INNER_FIELDS } from "./promoFragment";

export const SERVICE_DETAIL_CONTACT_US_FIELDS = `
  contact_us {
    Form {
      ... on ComponentBaseTemplatePromo {
        ${PROMO_INNER_FIELDS}
      }
    }
    pageReference
    RecipientEmails
  }
`;

