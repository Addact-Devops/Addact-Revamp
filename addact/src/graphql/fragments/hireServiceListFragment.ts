import { gql } from "graphql-request";
import { AI_LISTING_CONTEXT_FIELDS } from "./aiListingContextFragment";

export const HIRE_SERVICE_LIST_FRAGMENT = gql`
  fragment HireServiceListFields on ComponentHomeHireServiceList {
    isCarousel
    serviceTitle
    serviceVariant {
      variant
    }
    serviceList {
      listingContext {
        ${AI_LISTING_CONTEXT_FIELDS}
      }
    }
  }
`;

