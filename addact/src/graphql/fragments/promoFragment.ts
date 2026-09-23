import { gql } from "graphql-request";
import { ID_TITLE_DESCRIPTION_FIELDS, type IdTitleDescriptionType } from "./titleDescriptionFragment";
import type { ImageFragmentType } from "./imageFragment";
import type { LinkFragmentType } from "./linkFragment";

export const PROMO_INNER_FIELDS = `
  ${ID_TITLE_DESCRIPTION_FIELDS}
  Image {
    ...ImageFields
  }
  Link {
    ...LinkFields
  }
`;

export const COMPONENT_PROMO_FIELDS = `
  ... on ComponentBaseTemplatePromo {
    ${PROMO_INNER_FIELDS}
  }
`;

export const GLOBAL_CARD_PROMO_FIELDS = `
  GlobalCard {
    ${COMPONENT_PROMO_FIELDS}
  }
`;

export const PROMO_FRAGMENT = gql`
  fragment PromoFields on ComponentBaseTemplatePromo {
    ${PROMO_INNER_FIELDS}
  }
`;

export type PromoFragmentType = Required<IdTitleDescriptionType> & {
  Image: ImageFragmentType;
  Link: LinkFragmentType;
};


