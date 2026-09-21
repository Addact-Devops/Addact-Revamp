import { gql } from "graphql-request";
import { AI_LISTING_CONTEXT_FIELDS } from "./aiListingContextFragment";
import { CMS_SERVICE_VARIANT_FIELDS } from "./cmsServiceVariantFragment";
// Re-using OurServiceList and ServiceListItem from developmentDesignListingFragment to avoid duplicate type definitions
import { type OurServiceList, type ServiceListItem } from "./developmentDesignListingFragment";

export const QA_TESTING_LISTING_FRAGMENT = gql`
  fragment QaTestingListingFields on ComponentHomeQaTestingListing {
    id
    serviceTitle
    ${CMS_SERVICE_VARIANT_FIELDS}
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
