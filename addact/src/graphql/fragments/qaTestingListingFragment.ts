import { gql } from "graphql-request";
import { AI_LISTING_CONTEXT_FIELDS } from "./aiListingContextFragment";
// Re-using OurServiceList and ServiceListItem from developmentDesignListingFragment to avoid duplicate type definitions
import { type OurServiceList, type ServiceListItem } from "./developmentDesignListingFragment";

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

export type { OurServiceList, ServiceListItem };

export type QaTestingListingType = OurServiceList;
