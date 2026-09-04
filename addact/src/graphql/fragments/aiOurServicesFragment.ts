import { gql } from "graphql-request";
import { AI_LISTING_CONTEXT_FIELDS } from "./aiListingContextFragment";
import { AI_SERVICE_LIST_FIELDS } from "./aiServiceListFragment";

export const AI_OUR_SERVICES_FRAGMENT = gql`
  fragment AiOurServicesFields on ComponentHomeAiOurServices {
    listingContext {
      ${AI_LISTING_CONTEXT_FIELDS}
    }
    ${AI_SERVICE_LIST_FIELDS}
  }
`;
