import { gql } from "graphql-request";
import {
  SERVICE_LISTING_COMMON_FIELDS,
  type OurServiceList,
  type ServiceListItem,
} from "./developmentDesignListingFragment";

export const HIRE_SERVICE_LIST_FRAGMENT = gql`
  fragment HireServiceListFields on ComponentHomeHireServiceList {
    ${SERVICE_LISTING_COMMON_FIELDS}
  }
`;

export type { OurServiceList, ServiceListItem };

export type HireServiceListType = OurServiceList;
