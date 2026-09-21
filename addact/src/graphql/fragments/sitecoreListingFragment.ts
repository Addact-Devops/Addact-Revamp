import { gql } from "graphql-request";
import { CMS_SERVICE_VARIANT_FIELDS } from "./cmsServiceVariantFragment";
import { AI_SERVICE_LIST_FIELDS } from "./aiServiceListFragment";
// Re-using OurServiceList and ServiceListItem from developmentDesignListingFragment to avoid duplicate type definitions
import { type OurServiceList, type ServiceListItem } from "./developmentDesignListingFragment";

export const SITECORE_LISTING_FRAGMENT = gql`
  fragment SitecoreListingFields on ComponentHomeSitecoreListing {
    id
    serviceTitle
    ${AI_SERVICE_LIST_FIELDS}
    isCarousel
    ${CMS_SERVICE_VARIANT_FIELDS}
  }
`;


export type { OurServiceList, ServiceListItem };

export type SitecoreListingType = OurServiceList;

