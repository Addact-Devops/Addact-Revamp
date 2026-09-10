import { gql } from "graphql-request";
// Re-using OurServiceList and ServiceListItem from developmentDesignListingFragment to avoid duplicate type definitions
import { type OurServiceList, type ServiceListItem } from "./developmentDesignListingFragment";

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

export type { OurServiceList, ServiceListItem };

export type SitecoreListingType = OurServiceList;

