import { PROMO_INNER_FIELDS, type PromoFragmentType } from "./promoFragment";

export type ServiceListContactUsItem = {
  Form?: PromoFragmentType[];
  pageReference?: string;
  RecipientEmails?: string;
};

export type ServiceListContactUsType = {
  contact_us?: ServiceListContactUsItem;
};

export const SERVICE_LIST_CONTACT_US_FIELDS = `
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


