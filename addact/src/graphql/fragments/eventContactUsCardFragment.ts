import { CONTACT_US_FORM_LABELS_FIELDS, type ContactUsFormLabels } from "./contactUsFormLabelsFragment";
import { TITLE_DESCRIPTION_FIELDS, type TitleDescriptionType } from "./titleDescriptionFragment";

export const EVENT_CONTACT_US_CARD_FIELDS = `
  contact_us_card {
    ${CONTACT_US_FORM_LABELS_FIELDS}
    PhoneLabel
    Form {
      ... on ComponentBaseTemplatePromo {
        ${TITLE_DESCRIPTION_FIELDS}
      }
    }
  }
`;

export type EventContactUsCardItem = Required<ContactUsFormLabels> & {
  PhoneLabel: string;
  Form: Required<TitleDescriptionType>[];
};

export type EventContactUsCardType = {
  contact_us_card: EventContactUsCardItem;
};


