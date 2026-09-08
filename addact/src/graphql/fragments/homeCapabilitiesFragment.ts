import { gql } from "graphql-request";
import { AI_LISTING_CONTEXT_FIELDS } from "./aiListingContextFragment";

export const HOME_CAPABILITIES_FRAGMENT = gql`
  fragment HomeCapabilitiesFields on Home {
    ourCapabilitiy {
      heading
      capabilities {
        ${AI_LISTING_CONTEXT_FIELDS}
        sublinks {
          ...LinkFields
        }
      }
    }
  }
`;

