import { HEADING_INLINE_FIELDS } from "./headingFragment";
import { COMPONENT_PROMO_FIELDS } from "./promoFragment";
// Re-using Whyaddact and GlobalCard2 from homeWhyAddactFragment to avoid duplicate type definitions
import { type Whyaddact, type GlobalCard2 } from "./homeWhyAddactFragment";

export const WHY_ADDACT_FIELDS = `
  whyaddact {
    Title {
      ${HEADING_INLINE_FIELDS}
    }
    pageReference
    GlobalCard {
      ${COMPONENT_PROMO_FIELDS}
    }
  }
`;

export type { Whyaddact, GlobalCard2 };

export type WhyAddactType = {
  whyaddact: Whyaddact;
};
