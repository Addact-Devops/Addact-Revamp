import { gql } from "graphql-request";
import { ImageFragmentType } from "./imageFragment";
import { LinkFragmentType } from "./linkFragment";

export const PROMO_INNER_FIELDS = `
  id
  Title
  Description
  Image {
    ...ImageFields
  }
  Link {
    ...LinkFields
  }
`;

export const PROMO_FRAGMENT = gql`
  fragment PromoFields on ComponentBaseTemplatePromo {
    ${PROMO_INNER_FIELDS}
  }
`;

export type PromoFragmentType = {
  id: string;
  Title: string;
  Description: string;
  Image: ImageFragmentType;
  Link: LinkFragmentType;
};
