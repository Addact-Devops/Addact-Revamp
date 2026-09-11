import { gql } from "graphql-request";
import type { ImageFragmentType } from "./imageFragment";

export type SharedImageFragmentType = {
  Image?: ImageFragmentType;
};

export const SHARED_IMAGE_FRAGMENT = gql`
  fragment SharedImageFields on ComponentSharedImage {
    Image {
      ...ImageFields
    }
  }
`;

