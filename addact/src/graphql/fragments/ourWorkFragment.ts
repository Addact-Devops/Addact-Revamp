export const OUR_WORK_FIELDS = `
  ourWork {
    serviceTitle
    serviceVariant {
      variant
    }
    isCarousel
    serviceList {
      listingContext {
        id
        title
        description
        image {
          ...ImageFields
        }
        link {
          ...LinkFields
        }
      }
      tagLine {
        Title
      }
    }
  }
`;

