import { gql } from "graphql-request";
import { AI_LISTING_CONTEXT_FIELDS } from "./aiListingContextFragment";
import { CMS_SERVICE_VARIANT_FIELDS } from "./cmsServiceVariantFragment";
// Re-using OurServiceList and ServiceListItem from developmentDesignListingFragment to avoid duplicate type definitions
import { type OurServiceList, type ServiceListItem } from "./developmentDesignListingFragment";

export const HIRE_SERVICE_LIST_FRAGMENT = gql`
  fragment HireServiceListFields on ComponentHomeHireServiceList {
    isCarousel
    serviceTitle
    ${CMS_SERVICE_VARIANT_FIELDS}
    serviceList {
      listingContext {
        ${AI_LISTING_CONTEXT_FIELDS}
      }
    }
  }
`;

export type { OurServiceList, ServiceListItem };

export type HireServiceListType = OurServiceList;
