import { COMPONENT_PROMO_FIELDS, type PromoFragmentType } from "./promoFragment";

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
      ${COMPONENT_PROMO_FIELDS}
    }
    pageReference
    RecipientEmails
  }
`;


