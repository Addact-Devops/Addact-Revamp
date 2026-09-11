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

export const CARD_FRAGMENT = gql`
  fragment CardFields on ComponentCardCard {
    id
    CardTitle
    CardDescription
    CardLink {
      ...LinkFields
    }
    BgImage {
      ...ImageFields
    }
  }
`;

