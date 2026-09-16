import { gql } from "graphql-request";
import { PROMO_INNER_FIELDS } from "./promoFragment";
import { Image, Link } from "@/types/common";

export const HOME_CONTACT_US_FRAGMENT = gql`
  fragment HomeContactUsFields on Home {
    contactus {
      Form {
        ... on ComponentBaseTemplatePromo {
          ${PROMO_INNER_FIELDS}
        }
      }
      RecipientEmails
      pageReference
    }
  }
`;

export type ContactUsFormItem = {
  id: string;
  Title: string;
  Description: string;
  Image: Image;
  Link: Link;
};

export type CONTACTUS = {
  pageReference: string;
  RecipientEmails: string;
  Form: ContactUsFormItem[];
};

export type HomeContactUsType = {
  contactus: CONTACTUS;
};
