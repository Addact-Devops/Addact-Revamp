import { gql } from "graphql-request";
import { LISTING_CONTEXT_FIELDS, type AIListingContext, type ListingContextType } from "./aiListingContextFragment";

export const SERVICE_LISTING_COMMON_FIELDS = `
  id
  serviceTitle
  serviceVariant {
    variant
  }
  serviceList {
    ${LISTING_CONTEXT_FIELDS}
  }
  isCarousel
`;

export const DEVELOPMENT_DESIGN_LISTING_FRAGMENT = gql`
  fragment DevelopmentDesignListingFields on ComponentHomeDevelopmentAndDesignListing {
    ${SERVICE_LISTING_COMMON_FIELDS}
  }
`;

export type CmsServiceVariantType = {
  serviceVariant?: {
    variant?: string;
  } | null;
};

export type ServiceListItem = {
  listingContext: AIListingContext;
};

export type ServiceList = {
  serviceList: ServiceListItem[];
};

export type AIBenefit = ServiceList & {
  title: string;
};

export type ListingContext = AIListingContext;
export type { AIListingContext, ListingContextType };

export type OurServiceList = CmsServiceVariantType & {
  id: string;
  isCarousel?: boolean | null;
  serviceTitle?: string | null;
  serviceList: ServiceListItem[];
};

export type DevelopmentDesignListingType = OurServiceList;

