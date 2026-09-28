import { gql } from "graphql-request";
import { LISTING_CONTEXT_FIELDS } from "./aiListingContextFragment";
import type { LinkFragmentType } from "./linkFragment";
import { type OurServiceList, type ServiceListItem } from "./developmentDesignListingFragment";

export type UiUxListingContextItem = ServiceListItem;

export type UiUxListingType = OurServiceList & {
  link?: LinkFragmentType;
};

export type { OurServiceList, ServiceListItem };

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
      ${LISTING_CONTEXT_FIELDS}
    }
  }
`;


