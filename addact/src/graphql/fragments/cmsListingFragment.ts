import { gql } from "graphql-request";



export const CMS_LISTING_FRAGMENT = gql`
  fragment CmsListingFields on ComponentHomeCmsListing {
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
