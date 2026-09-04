import { gql } from "graphql-request";

export const HOME_CAPABILITIES_FRAGMENT = gql`
  fragment HomeCapabilitiesFields on Home {
    ourCapabilitiy {
      heading
      capabilities {
        title
        description
        link {
          ...LinkFields
        }
        image {
          ...ImageFields
        }
        sublinks {
          ...LinkFields
        }
      }
    }
  }
`;
