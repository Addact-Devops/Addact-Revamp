import { gql } from "graphql-request";
import { COMPONENT_BANNER_FIELDS } from "./componentBannerFieldsFragment";

export const CAREER_DETAILS_BANNER_FRAGMENT = gql`
  fragment CareerDetailsBannerFields on CareerDetail {
    Banner {
      ... on ComponentBannerBanner {
        ${COMPONENT_BANNER_FIELDS}
      }
    }
  }
`;

