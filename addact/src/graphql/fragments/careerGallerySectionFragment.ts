import { type GalleryTitlesType } from "./galleryTitlesFragment";

export const CAREER_GALLERY_SECTION_FIELDS = `
  careers {
    Gallery {
      ... on ComponentAddactComponentGalleryTitles { ...GalleryTitlesFields }
    }
  }
`;

export type GallerySection = GalleryTitlesType;

export type CareerGallerySectionType = {
  careers: {
    Gallery?: GallerySection[];
  };
};
