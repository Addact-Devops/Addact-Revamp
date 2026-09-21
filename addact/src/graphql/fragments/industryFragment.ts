import { AI_LISTING_CONTEXT_FIELDS, type AIListingContext } from "./aiListingContextFragment";

export const INDUSTRY_FIELDS = `
  industryListTitle
  industry_list {
    Slug
    listingContext {
      ${AI_LISTING_CONTEXT_FIELDS}
    }
  }
`;

export type IndustryListItem = {
  Slug: string;
  listingContext: AIListingContext | null;
};

export type Industry = {
  industryListTitle: string;
  industry_list: IndustryListItem[];
};

export type IndustryType = {
  industry: Industry;
};

