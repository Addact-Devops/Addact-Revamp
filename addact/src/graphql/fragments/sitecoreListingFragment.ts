import { gql } from "graphql-request";



export const SITECORE_LISTING_FRAGMENT = gql`
  fragment SitecoreListingFields on ComponentHomeSitecoreListing {
    id
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
    serviceVariant {
      variant
    }
  }
`;
