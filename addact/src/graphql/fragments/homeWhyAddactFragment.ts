import { gql } from "graphql-request";
import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { GLOBAL_CARD_PROMO_FIELDS } from "./globalCardPromoFragment";
import type { PromoFragmentType } from "./promoFragment";
import type { HeadingFragmentType } from "./headingFragment";

export const HOME_WHY_ADDACT_FIELDS = `
  whyaddact {
    Title {
      ${BLOG_CONTENT_HEADINGS_FIELDS}
    }
    pageReference
    ${GLOBAL_CARD_PROMO_FIELDS}
  }
`;

export const HOME_WHY_ADDACT_FRAGMENT = gql`
  fragment HomeWhyAddactFields on Home {
    ${HOME_WHY_ADDACT_FIELDS}
  }
`;

export type GlobalCard2 = PromoFragmentType;

export type Whyaddact = {
  Title: HeadingFragmentType[];
  pageReference?: string;
  GlobalCard: GlobalCard2[];
};

export type HomeWhyAddactType = {
  whyaddact: Whyaddact;
};


