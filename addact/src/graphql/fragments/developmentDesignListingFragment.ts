import { gql } from "graphql-request";
import { CMS_SERVICE_VARIANT_FIELDS, type CmsServiceVariantType } from "./cmsServiceVariantFragment";
import { AI_SERVICE_LIST_FIELDS, type ServiceListItem } from "./aiServiceListFragment";
import { type AIListingContext, type ListingContextType } from "./aiListingContextFragment";

export const SERVICE_LISTING_COMMON_FIELDS = `
  id
  serviceTitle
  ${CMS_SERVICE_VARIANT_FIELDS}
  ${AI_SERVICE_LIST_FIELDS}
  isCarousel
`;

export const DEVELOPMENT_DESIGN_LISTING_FRAGMENT = gql`
  fragment DevelopmentDesignListingFields on ComponentHomeDevelopmentAndDesignListing {
    ${SERVICE_LISTING_COMMON_FIELDS}
  }
`;

export type ListingContext = AIListingContext;
export type { ServiceListItem, ListingContextType };

export type OurServiceList = CmsServiceVariantType & {
  id: string;
  isCarousel?: boolean | null;
  serviceTitle?: string | null;
  serviceList: ServiceListItem[];
};

export type DevelopmentDesignListingType = OurServiceList;
