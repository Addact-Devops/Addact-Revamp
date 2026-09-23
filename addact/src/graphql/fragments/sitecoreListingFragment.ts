import { gql } from "graphql-request";
import {
  SERVICE_LISTING_COMMON_FIELDS,
  type OurServiceList,
  type ServiceListItem,
} from "./developmentDesignListingFragment";

export const SITECORE_LISTING_FRAGMENT = gql`
  fragment SitecoreListingFields on ComponentHomeSitecoreListing {
    ${SERVICE_LISTING_COMMON_FIELDS}
  }
`;


export type { OurServiceList, ServiceListItem };

export type SitecoreListingType = OurServiceList;

