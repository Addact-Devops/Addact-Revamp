import { gql } from "graphql-request";
import { AI_LISTING_CONTEXT_FIELDS } from "./aiListingContextFragment";
// Re-using OurServiceList and ServiceListItem from developmentDesignListingFragment to avoid duplicate type definitions
import { type OurServiceList, type ServiceListItem } from "./developmentDesignListingFragment";

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

export type { OurServiceList, ServiceListItem };

export type HireServiceListType = OurServiceList;
