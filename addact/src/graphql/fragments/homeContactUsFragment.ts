import { gql } from "graphql-request";
import { CONTACT_US_FORM_FIELDS } from "./contactUsFormFragment";
import type { PromoFragmentType } from "./promoFragment";

export const HOME_CONTACT_US_FRAGMENT = gql`
  fragment HomeContactUsFields on Home {
    ${CONTACT_US_FORM_FIELDS}
  }
`;

export type ContactUsFormItem = PromoFragmentType;

export type CONTACTUS = {
  pageReference: string;
  RecipientEmails: string;
  Form: ContactUsFormItem[];
};

export type HomeContactUsType = {
  contactus: CONTACTUS;
};
