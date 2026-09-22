import { LISTING_CONTEXT_FIELDS, type AIListingContext } from "./aiListingContextFragment";
import type { SlugType } from "@/types/common";

export const INDUSTRY_FIELDS = `
  industryListTitle
  industry_list {
    Slug
    ${LISTING_CONTEXT_FIELDS}
  }
`;

export type IndustryListItem = Required<SlugType> & {
  listingContext: AIListingContext | null;
};

export type Industry = {
  industryListTitle: string;
  industry_list: IndustryListItem[];
};

export type IndustryType = {
  industry: Industry;
};

