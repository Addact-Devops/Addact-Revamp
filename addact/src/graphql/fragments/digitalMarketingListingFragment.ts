import { gql } from "graphql-request";
import { AI_LISTING_CONTEXT_FIELDS } from "./aiListingContextFragment";
// Re-using OurServiceList and ServiceListItem from developmentDesignListingFragment to avoid duplicate type definitions
import { type OurServiceList, type ServiceListItem } from "./developmentDesignListingFragment";

export const DIGITAL_MARKETING_LISTING_FRAGMENT = gql`
  fragment DigitalMarketingListingFields on ComponentHomeDigitalMarketingListing {
    id
    serviceVariant {
      variant
    }
    serviceTitle
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

export type DigitalMarketingListingType = OurServiceList;
