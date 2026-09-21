import { CONTACT_US_FORM_LABELS_FIELDS, type ContactUsFormLabels } from "./contactUsFormLabelsFragment";

export const EVENT_CONTACT_US_CARD_FIELDS = `
  contact_us_card {
    ${CONTACT_US_FORM_LABELS_FIELDS}
    PhoneLabel
    Form {
      ... on ComponentBaseTemplatePromo {
        Title
        Description
      }
    }
  }
`;

export type EventContactUsCardItem = Required<ContactUsFormLabels> & {
  PhoneLabel: string;
  Form: {
    Title: string;
    Description: string;
  }[];
};

export type EventContactUsCardType = {
  contact_us_card: EventContactUsCardItem;
};


