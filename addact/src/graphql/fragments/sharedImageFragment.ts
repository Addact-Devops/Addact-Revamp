import { gql } from "graphql-request";
import { IMAGE_FIELD_SELECTION, type ImageFragmentType } from "./imageFragment";

export type SharedImageFragmentType = {
  Image?: ImageFragmentType;
};

export const SHARED_IMAGE_FRAGMENT = gql`
  fragment SharedImageFields on ComponentSharedImage {
    ${IMAGE_FIELD_SELECTION}
  }
`;

