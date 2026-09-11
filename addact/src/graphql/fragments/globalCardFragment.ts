import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { GLOBAL_CARD_PROMO_FIELDS } from "./globalCardPromoFragment";
import type { HeadingFragmentType } from "./headingFragment";
import type { RichtextFragmentType } from "./richtextFragment";
import type { PromoFragmentType } from "./promoFragment";

export type GlobalCardTitleItem = HeadingFragmentType | RichtextFragmentType;

export type GlobalCardFieldsItem = {
  Title?: GlobalCardTitleItem[];
  GlobalCard?: PromoFragmentType[];
};

export type GlobalCardType = {
  global_card?: GlobalCardFieldsItem;
};

export const GLOBAL_CARD_FIELDS = `
  global_card {
    Title {
      ${BLOG_CONTENT_HEADINGS_FIELDS}
      ... on ComponentBaseTemplateRichtext { ...RichtextFields }
    }
    ${GLOBAL_CARD_PROMO_FIELDS}
  }
`;

