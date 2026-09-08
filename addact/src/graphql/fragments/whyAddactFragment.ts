import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { PROMO_INNER_FIELDS } from "./promoFragment";

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

