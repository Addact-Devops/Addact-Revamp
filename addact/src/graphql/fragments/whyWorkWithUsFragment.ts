import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { GLOBAL_CARD_PROMO_FIELDS } from "./globalCardPromoFragment";
// Re-using Whyaddact and GlobalCard2 from homeWhyAddactFragment to avoid duplicate type definitions
import { type Whyaddact, type GlobalCard2 } from "./homeWhyAddactFragment";

export const WHY_WORK_WITH_US_FIELDS = `
  Title {
    ${BLOG_CONTENT_HEADINGS_FIELDS}
  }
  pageReference
  ${GLOBAL_CARD_PROMO_FIELDS}
`;

export type { Whyaddact, GlobalCard2 };

export type WhyWorkWithUsType = {
  whyaddact: Whyaddact;
};
