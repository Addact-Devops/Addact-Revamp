import { gql } from "graphql-request";

export const IMAGE_FRAGMENT = gql`
  fragment ImageFields on UploadFile {
    alternativeText
    caption
    width
    height
    url
    name
  }
`;

export type ImageFragmentType = {
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  url: string;
  name?: string;
};
