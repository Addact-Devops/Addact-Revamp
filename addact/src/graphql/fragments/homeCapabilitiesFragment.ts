import { gql } from "graphql-request";

export const HOME_CAPABILITIES_FRAGMENT = gql`
  fragment HomeCapabilitiesFields on Home {
    ourCapabilitiy {
      heading
      capabilities {
        title
        description
        link {
          id
          href
          label
          target
          isExternal
          SubDisc
          Icon {
            alternativeText
            height
            url
            width
          }
        }
        image {
          alternativeText
          height
          url
          width
        }
        sublinks {
          id
          href
          label
          target
          isExternal
          SubDisc
          Icon {
            alternativeText
            height
            url
            width
          }
        }
      }
    }
  }
`;
