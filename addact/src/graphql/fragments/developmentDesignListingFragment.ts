import { gql } from "graphql-request";



export const DEVELOPMENT_DESIGN_LISTING_FRAGMENT = gql`
  fragment DevelopmentDesignListingFields on ComponentHomeDevelopmentAndDesignListing {
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
