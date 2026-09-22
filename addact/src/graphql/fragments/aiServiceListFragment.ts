import { LISTING_CONTEXT_FIELDS, type AIListingContext } from "./aiListingContextFragment";

export const AI_SERVICE_LIST_FIELDS = `
  serviceList {
    ${LISTING_CONTEXT_FIELDS}
  }
`;

export type ServiceListItem = {
  listingContext: AIListingContext;
};

export type ServiceList = {
  serviceList: ServiceListItem[];
};
