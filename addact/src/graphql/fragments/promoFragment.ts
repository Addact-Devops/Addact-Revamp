import { gql } from "graphql-request";
import { ImageFragmentType } from "./imageFragment";
import { LinkFragmentType } from "./linkFragment";

export const PROMO_FRAGMENT = gql`
  fragment PromoFields on ComponentBaseTemplatePromo {
    id
    Title
    Description
    Image {
      ...ImageFields
    }
    Link {
      ...LinkFields
    }
  }
`;

export type PromoFragmentType = {
  id: string;
  Title: string;
  Description: string;
  Image: ImageFragmentType;
  Link: LinkFragmentType;
};
