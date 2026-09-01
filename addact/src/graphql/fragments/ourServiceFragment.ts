import { gql } from "graphql-request";



export const OUR_SERVICE_FRAGMENT = gql`
  fragment OurServiceFields on ComponentHomeServiceList {
    isCarousel
    serviceTitle
    serviceDescription
    serviceLink {
      ...LinkFields
    }
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
