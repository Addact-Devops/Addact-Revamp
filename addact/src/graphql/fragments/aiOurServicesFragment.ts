import { gql } from "graphql-request";



export const AI_OUR_SERVICES_FRAGMENT = gql`
  fragment AiOurServicesFields on ComponentHomeAiOurServices {
    listingContext {
      title
      description
      image {
        ...ImageFields
      }
      link {
        ...LinkFields
      }
    }
    serviceList {
      listingContext {
        id
        title
        description
        image {
          ...ImageFields
        }
        link {
          ...LinkFields
        }
      }
    }
  }
`;
