import { gql } from "graphql-request";



export const QA_TESTING_LISTING_FRAGMENT = gql`
  fragment QaTestingListingFields on ComponentHomeQaTestingListing {
    id
    serviceTitle
    serviceVariant {
      variant
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
    isCarousel
  }
`;
