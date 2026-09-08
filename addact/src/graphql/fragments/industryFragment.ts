import { AI_LISTING_CONTEXT_FIELDS } from "./aiListingContextFragment";

export const INDUSTRY_FIELDS = `
  industryListTitle
  industry_list {
    Slug
    listingContext {
      ${AI_LISTING_CONTEXT_FIELDS}
    }
  }
`;

