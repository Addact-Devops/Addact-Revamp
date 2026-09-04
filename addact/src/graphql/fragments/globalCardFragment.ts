import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { GLOBAL_CARD_PROMO_FIELDS } from "./globalCardPromoFragment";

export const GLOBAL_CARD_FIELDS = `
  global_card {
    Title {
      ${BLOG_CONTENT_HEADINGS_FIELDS}
      ... on ComponentBaseTemplateRichtext { ...RichtextFields }
    }
    ${GLOBAL_CARD_PROMO_FIELDS}
  }
`;
