import { AI_LISTING_CONTEXT_FIELDS } from "./aiListingContextFragment";
import { Image } from "@/types/common";
import { LinkWithIcon } from "./homeCapabilitiesFragment";

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
  listingContext: {
    title: string;
    description: string;
    image: Image | null;
    link: LinkWithIcon | null;
  } | null;
};

export type Industry = {
  industryListTitle: string;
  industry_list: IndustryListItem[];
};

export type IndustryType = {
  industry: Industry;
};

