import { AI_LISTING_CONTEXT_FIELDS, type AIListingContext } from "./aiListingContextFragment";

export const AI_SERVICE_LIST_FIELDS = `
  serviceList {
    listingContext {
      id
      ${AI_LISTING_CONTEXT_FIELDS}
    }
  }
`;

export type ServiceListItem = {
  listingContext: AIListingContext & { id: string };
};

export type ServiceList = {
  serviceList: ServiceListItem[];
};

