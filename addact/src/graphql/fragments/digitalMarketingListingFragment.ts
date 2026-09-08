import { gql } from "graphql-request";
import { AI_LISTING_CONTEXT_FIELDS } from "./aiListingContextFragment";

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

