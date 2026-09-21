import { IMAGE_FIELD_SELECTION, type ImageFragmentType } from "./imageFragment";

export const CAREER_GALLERY_CATEGORIES_FIELDS = `
  galleryCategories(pagination: { limit: -1 }) {
    Name
    Images(pagination: { limit: -1 }) {
      ${IMAGE_FIELD_SELECTION}
      Year
    }
  }
`;

export type GalleryImageItem = {
  Image: ImageFragmentType;
  Year: number | null;
};

export type GalleryCategory = {
  Name: string;
  Images: GalleryImageItem[];
};

export type CareerGalleryCategoriesType = {
  galleryCategories: GalleryCategory[];
};

