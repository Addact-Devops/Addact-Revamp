import { gql } from "graphql-request";



export const UI_UX_LISTING_FRAGMENT = gql`
  fragment UiUxListingFields on ComponentHomeUiUxLisitng {
    serviceTitle
    serviceVariant {
      variant
    }
    isCarousel
    link {
      ...LinkFields
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
