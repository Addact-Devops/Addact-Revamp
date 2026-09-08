import { CONTACT_US_FORM_LABELS_FIELDS } from "./contactUsFormLabelsFragment";
import { PROMO_INNER_FIELDS } from "./promoFragment";

export const CONTACT_US_FIELDS = `
  ContactUs {
    pageReference
    Form {
      ... on ComponentBaseTemplatePromo {
        ${PROMO_INNER_FIELDS}
      }
    }
    ${CONTACT_US_FORM_LABELS_FIELDS}
  }
`;

