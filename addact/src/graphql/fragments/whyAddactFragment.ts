import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { PROMO_INNER_FIELDS } from "./promoFragment";
// Re-using Whyaddact and GlobalCard2 from homeWhyAddactFragment to avoid duplicate type definitions
import { type Whyaddact, type GlobalCard2 } from "./homeWhyAddactFragment";

export const WHY_ADDACT_FIELDS = `
  whyaddact {
    Title {
      ${BLOG_CONTENT_HEADINGS_FIELDS}
    }
    pageReference
    GlobalCard {
      ... on ComponentBaseTemplatePromo {
        ${PROMO_INNER_FIELDS}
      }
    }
  }
`;

export type { Whyaddact, GlobalCard2 };

export type WhyAddactType = {
  whyaddact: Whyaddact;
};
