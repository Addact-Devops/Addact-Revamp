import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { GLOBAL_CARD_PROMO_FIELDS } from "./globalCardPromoFragment";
import { type Whyaddact as WhyAddact } from "./homeWhyAddactFragment";

export type ServiceListWhyAddactItem = WhyAddact;

export type ServiceListWhyAddactType = {
  why_addact?: ServiceListWhyAddactItem;
};

export type { WhyAddact };

export const SERVICE_LIST_WHY_ADDACT_FIELDS = `
  why_addact {
    Title {
      ${BLOG_CONTENT_HEADINGS_FIELDS}
    }
    ${GLOBAL_CARD_PROMO_FIELDS}
    pageReference
  }
`;

