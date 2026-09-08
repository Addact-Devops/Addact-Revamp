import { CONTACT_US_FORM_LABELS_FIELDS } from "./contactUsFormLabelsFragment";
import { BANNER_TITLE_DESCRIPTION_FIELDS } from "./componentBannerFieldsFragment";

export const EVENT_CONTACT_US_CARD_FIELDS = `
  contact_us_card {
    ${CONTACT_US_FORM_LABELS_FIELDS}
    PhoneLabel
    Form {
      ... on ComponentBaseTemplatePromo {
        ${BANNER_TITLE_DESCRIPTION_FIELDS}
      }
    }
  }
`;


