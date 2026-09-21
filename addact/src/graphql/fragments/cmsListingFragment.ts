import { gql } from "graphql-request";
import {
  SERVICE_LISTING_COMMON_FIELDS,
  type OurServiceList,
  type ServiceListItem,
} from "./developmentDesignListingFragment";

export const CMS_LISTING_INNER_FIELDS = SERVICE_LISTING_COMMON_FIELDS;

export const CMS_LISTING_FIELDS = `
  ... on ComponentHomeCmsListing {
    ${SERVICE_LISTING_COMMON_FIELDS}
  }
`;

export const CMS_LISTING_FRAGMENT = gql`
  fragment CmsListingFields on ComponentHomeCmsListing {
    ${SERVICE_LISTING_COMMON_FIELDS}
  }
`;

export type { OurServiceList, ServiceListItem };

export type CmsListingType = OurServiceList;

