import { gql } from "graphql-request";
import { AI_LISTING_CONTEXT_FIELDS } from "./aiListingContextFragment";

export const QA_TESTING_LISTING_FRAGMENT = gql`
  fragment QaTestingListingFields on ComponentHomeQaTestingListing {
    id
    serviceTitle
    serviceVariant {
      variant
    }
    serviceList {
      listingContext {
        id
        ${AI_LISTING_CONTEXT_FIELDS}
      }
    }
    isCarousel
  }
`;
