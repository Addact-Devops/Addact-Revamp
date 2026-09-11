import { Image, Link } from "@/types/common";
import { PROMO_INNER_FIELDS, type PromoFragmentType } from "./promoFragment";

export type ServiceDetailContactUsItem = {
  Form?: PromoFragmentType[];
  pageReference?: string;
  RecipientEmails?: string;
};

export type ServiceDetailContactUsType = {
  contact_us?: ServiceDetailContactUsItem;
};

export interface CONTACTUS {
  pageReference: string;
  RecipientEmails: string;
  Form: {
    id: string;
    Title: string;
    Description: string;
    Image: Image;
    Link: Link;
  }[];
}


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


