import { PROMO_INNER_FIELDS, type PromoFragmentType } from "./promoFragment";

export type GlobalCardPromoType = {
  GlobalCard?: PromoFragmentType[];
};

export const GLOBAL_CARD_PROMO_FIELDS = `
  GlobalCard {
    ... on ComponentBaseTemplatePromo {
      ${PROMO_INNER_FIELDS}
    }
  }
`;

