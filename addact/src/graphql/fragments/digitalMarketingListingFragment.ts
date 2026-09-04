import { gql } from "graphql-request";



export const DIGITAL_MARKETING_LISTING_FRAGMENT = gql`
  fragment DigitalMarketingListingFields on ComponentHomeDigitalMarketingListing {
    id
    serviceVariant {
      variant
    }
    serviceTitle
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
