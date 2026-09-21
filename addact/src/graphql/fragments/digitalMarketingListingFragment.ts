import { gql } from "graphql-request";
import {
  SERVICE_LISTING_COMMON_FIELDS,
  type OurServiceList,
  type ServiceListItem,
} from "./developmentDesignListingFragment";

export const DIGITAL_MARKETING_LISTING_FRAGMENT = gql`
  fragment DigitalMarketingListingFields on ComponentHomeDigitalMarketingListing {
    ${SERVICE_LISTING_COMMON_FIELDS}
  }
`;

export type { OurServiceList, ServiceListItem };

export type DigitalMarketingListingType = OurServiceList;
