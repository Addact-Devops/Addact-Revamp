import { gql } from "graphql-request";
import type { ImageFragmentType } from "./imageFragment";
import type { LinkFragmentType } from "./linkFragment";

export type CardFragmentType = {
  id?: string;
  CardTitle?: string;
  CardDescription?: string;
  CardLink?: LinkFragmentType;
  BgImage?: ImageFragmentType;
};

export const CARD_INNER_FIELDS = `
  id
  CardTitle
  CardDescription
  CardLink {
    ...LinkFields
  }
  BgImage {
    ...ImageFields
  }
`;

export const COMPONENT_CARD_FIELDS = `
  ... on ComponentCardCard {
    ${CARD_INNER_FIELDS}
  }
`;

export const CARD_FRAGMENT = gql`
  fragment CardFields on ComponentCardCard {
    ${CARD_INNER_FIELDS}
  }
`;

