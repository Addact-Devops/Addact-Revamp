import { AI_LISTING_CONTEXT_FIELDS } from "./aiListingContextFragment";

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
        ${AI_LISTING_CONTEXT_FIELDS}
      }
      tagLine {
        Title
      }
    }
  }
`;

