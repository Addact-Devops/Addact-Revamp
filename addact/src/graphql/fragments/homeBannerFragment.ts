import { gql } from "graphql-request";
import { COMPONENT_BANNER_FIELDS } from "./componentBannerFieldsFragment";

export const HOME_BANNER_FRAGMENT = gql`
  fragment HomeBannerFields on Home {
    banner {
      Banner {
        ... on ComponentBannerBanner {
          ${COMPONENT_BANNER_FIELDS}
        }
      }
    }
  }
`;
