import { gql } from "graphql-request";
import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { PROMO_INNER_FIELDS } from "./promoFragment";
import { Heading, Image, Link } from "@/types/common";

export const HOME_SERVICES_FRAGMENT = gql`
  fragment HomeServicesFields on Home {
    ourservices {
      GlobalCard {
        ... on ComponentBaseTemplatePromo {
          ${PROMO_INNER_FIELDS}
        }
      }
      Title {
        ${BLOG_CONTENT_HEADINGS_FIELDS}
      }
      documentId
      pageReference
    }
  }
`;

export type GlobalCardItem = {
  id: string;
  Title: string;
  Description: string;
  Image: Image;
  Link: Link;
};

export type OURSERVICES = {
  Title: Heading[];
  GlobalCard: GlobalCardItem[];
  documentId: string;
  pageReference: string;
};

export type HomeServicesType = {
  ourservices: OURSERVICES;
};

