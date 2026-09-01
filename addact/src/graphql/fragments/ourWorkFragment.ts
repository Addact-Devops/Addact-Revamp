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
          alternativeText
          height
          url
          width
        }
        link {
          id
          href
          label
          target
          isExternal
          SubDisc
          Icon {
            alternativeText
            height
            url
            width
          }
        }
      }
      tagLine {
        Title
      }
    }
  }
`;
