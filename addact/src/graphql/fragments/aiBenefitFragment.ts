import { AI_LISTING_CONTEXT_FIELDS } from "./aiListingContextFragment";

export const AI_BENEFIT_FIELDS = `
  title
  serviceList {
    listingContext {
      ${AI_LISTING_CONTEXT_FIELDS}
    }
  }
`;

