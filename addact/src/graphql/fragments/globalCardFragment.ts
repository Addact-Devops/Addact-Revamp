import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { GLOBAL_CARD_PROMO_FIELDS } from "./promoFragment";
import { RICHTEXT_FIELDS, type RichtextFragmentType } from "./richtextFragment";
import type { HeadingFragmentType } from "./headingFragment";
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
      ${RICHTEXT_FIELDS}
    }
    ${GLOBAL_CARD_PROMO_FIELDS}
  }
`;


