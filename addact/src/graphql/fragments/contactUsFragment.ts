import { CONTACT_US_FORM_LABELS_FIELDS, type ContactUsFormLabels } from "./contactUsFormLabelsFragment";
import { COMPONENT_PROMO_FIELDS, type PromoFragmentType } from "./promoFragment";

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
      ${COMPONENT_PROMO_FIELDS}
    }
    ${CONTACT_US_FORM_LABELS_FIELDS}
  }
`;


