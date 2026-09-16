export const CAREER_GALLERY_CATEGORIES_FIELDS = `
  galleryCategories(pagination: { limit: -1 }) {
    Name
    Images(pagination: { limit: -1 }) {
      Image {
        ...ImageFields
      }
      Year
    }
  }
`;

export type GalleryCategory = {
  Name: string;
  Images: {
    Image: {
      url: string;
      alternativeText: string | null;
    };
    Year: number | null;
  }[];
};

export type CareerGalleryCategoriesType = {
  galleryCategories: GalleryCategory[];
};
