export const CAREER_GALLERY_SECTION_FIELDS = `
  careers {
    Gallery {
      ... on ComponentAddactComponentGalleryTitles { ...GalleryTitlesFields }
    }
  }
`;

export type GallerySection = {
  Title?: string;
  SubTitle?: string;
};

export type CareerGallerySectionType = {
  careers: {
    Gallery?: GallerySection[];
  };
};
