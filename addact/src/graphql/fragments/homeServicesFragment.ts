import { gql } from "graphql-request";
import { HEADING_INLINE_FIELDS } from "./headingFragment";
import { GLOBAL_CARD_PROMO_FIELDS } from "./globalCardPromoFragment";
import type { PromoFragmentType } from "./promoFragment";
import type { HeadingFragmentType } from "./headingFragment";

export const HOME_SERVICES_FIELDS = `
  ourservices {
    ${GLOBAL_CARD_PROMO_FIELDS}
    Title {
      ${HEADING_INLINE_FIELDS}
    }
    documentId
    pageReference
  }
`;

export const HOME_SERVICES_FRAGMENT = gql`
  fragment HomeServicesFields on Home {
    ${HOME_SERVICES_FIELDS}
  }
`;

export type GlobalCardItem = PromoFragmentType;

export type OURSERVICES = {
  Title: HeadingFragmentType[];
  GlobalCard: GlobalCardItem[];
  documentId: string;
  pageReference: string;
};

export type HomeServicesType = {
  ourservices: OURSERVICES;
};

