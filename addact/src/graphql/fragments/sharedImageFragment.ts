import { gql } from "graphql-request";


export const SHARED_IMAGE_FRAGMENT = gql`
  fragment SharedImageFields on ComponentSharedImage {
    Image {
      ...ImageFields
    }
  }
`;
