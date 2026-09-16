import { gql } from "graphql-request";

export const GALLERY_TITLES_FRAGMENT = gql`
  fragment GalleryTitlesFields on ComponentAddactComponentGalleryTitles {
    Title
    SubTitle
  }
`;

export type GalleryTitlesType = {
  Title?: string;
  SubTitle?: string;
};

