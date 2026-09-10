import { gql } from "graphql-request";
import { CMS_SERVICE_VARIANT_FIELDS } from "./cmsServiceVariantFragment";
import { AI_SERVICE_LIST_FIELDS } from "./aiServiceListFragment";
// Re-using OurServiceList and ServiceListItem from developmentDesignListingFragment to avoid duplicate type definitions
import { type OurServiceList, type ServiceListItem } from "./developmentDesignListingFragment";

export const CMS_LISTING_FRAGMENT = gql`
  fragment CmsListingFields on ComponentHomeCmsListing {
    id
    serviceTitle
    ${CMS_SERVICE_VARIANT_FIELDS}
    ${AI_SERVICE_LIST_FIELDS}
    isCarousel
  }
`;

export type { OurServiceList, ServiceListItem };

export type CmsListingType = OurServiceList;
