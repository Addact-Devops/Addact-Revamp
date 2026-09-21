import { gql } from "graphql-request";
import { AI_LISTING_CONTEXT_FIELDS, type AIListingContext } from "./aiListingContextFragment";
import { AI_SERVICE_LIST_FIELDS, type ServiceListItem } from "./aiServiceListFragment";
import { type LinkWithIcon } from "./homeCapabilitiesFragment";

export const AI_OUR_SERVICES_FRAGMENT = gql`
  fragment AiOurServicesFields on ComponentHomeAiOurServices {
    listingContext {
      ${AI_LISTING_CONTEXT_FIELDS}
    }
    ${AI_SERVICE_LIST_FIELDS}
  }
`;

export type { LinkWithIcon, AIListingContext, ServiceListItem };

export type OurService = {
  listingContext: AIListingContext;
  serviceList: ServiceListItem[];
};
