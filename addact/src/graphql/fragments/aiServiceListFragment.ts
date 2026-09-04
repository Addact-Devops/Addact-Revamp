import { AI_LISTING_CONTEXT_FIELDS } from "./aiListingContextFragment";

export const AI_SERVICE_LIST_FIELDS = `
  serviceList {
    listingContext {
      id
      ${AI_LISTING_CONTEXT_FIELDS}
    }
  }
`;
