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
