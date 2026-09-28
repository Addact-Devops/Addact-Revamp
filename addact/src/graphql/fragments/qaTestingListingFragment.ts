import { gql } from "graphql-request";
import {
  SERVICE_LISTING_COMMON_FIELDS,
  type OurServiceList,
  type ServiceListItem,
} from "./developmentDesignListingFragment";

export const QA_TESTING_LISTING_FRAGMENT = gql`
  fragment QaTestingListingFields on ComponentHomeQaTestingListing {
    ${SERVICE_LISTING_COMMON_FIELDS}
  }
`;

export type { OurServiceList, ServiceListItem };

export type QaTestingListingType = OurServiceList;
