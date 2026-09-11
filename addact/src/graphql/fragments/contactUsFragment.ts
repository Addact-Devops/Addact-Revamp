import { CONTACT_US_FORM_LABELS_FIELDS, type ContactUsFormLabels } from "./contactUsFormLabelsFragment";
import { PROMO_INNER_FIELDS, type PromoFragmentType } from "./promoFragment";

export type ContactUsDetailsType = ContactUsFormLabels & {
  pageReference?: string;
  Form?: PromoFragmentType[];
};

export type ContactUsFragmentType = {
  ContactUs?: ContactUsDetailsType;
};

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


