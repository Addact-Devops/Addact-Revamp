import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { BLOG_CONTENT_ERROR_FIELDS } from "./blogContentErrorFragment";
import { PROMO_INNER_FIELDS } from "./promoFragment";

export const CAREER_CARD_FIELDS = `
  Title {
    ${BLOG_CONTENT_HEADINGS_FIELDS}
    ... on ComponentBaseTemplateRichtext { ...RichtextFields }
    ${BLOG_CONTENT_ERROR_FIELDS}
  }
  GlobalCard {
    ... on ComponentBaseTemplatePromo {
      ${PROMO_INNER_FIELDS}
    }
    ${BLOG_CONTENT_ERROR_FIELDS}
  }
`;

