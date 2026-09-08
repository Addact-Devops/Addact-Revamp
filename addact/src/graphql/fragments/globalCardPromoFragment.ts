import { PROMO_INNER_FIELDS } from "./promoFragment";

export const GLOBAL_CARD_PROMO_FIELDS = `
  GlobalCard {
    ... on ComponentBaseTemplatePromo {
      ${PROMO_INNER_FIELDS}
    }
  }
`;
