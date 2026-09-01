import { gql } from "graphql-request";



export const HIRE_SERVICE_LIST_FRAGMENT = gql`
  fragment HireServiceListFields on ComponentHomeHireServiceList {
    isCarousel
    serviceTitle
    serviceVariant {
      variant
    }
    serviceList {
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
    }
  }
`;
