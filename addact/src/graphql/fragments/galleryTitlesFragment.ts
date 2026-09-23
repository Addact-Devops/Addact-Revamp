import { gql } from "graphql-request";
import { type TitleSubTitleType } from "./titleDescriptionFragment";

export const GALLERY_TITLES_FRAGMENT = gql`
  fragment GalleryTitlesFields on ComponentAddactComponentGalleryTitles {
    Title
    SubTitle
  }
`;

export type GalleryTitlesType = TitleSubTitleType;

