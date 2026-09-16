import { gql } from "graphql-request";
import type { ImageFragmentType } from "./imageFragment";
import type { LinkFragmentType } from "./linkFragment";

export type UiUxListingContextItem = {
  listingContext?: {
    title?: string;
    description?: string;
    image?: ImageFragmentType;
    link?: LinkFragmentType;
  };
};

export type UiUxListingType = {
  serviceTitle?: string;
  serviceVariant?: {
    variant?: string;
  };
  isCarousel?: boolean;
  link?: LinkFragmentType;
  serviceList?: UiUxListingContextItem[];
};

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

