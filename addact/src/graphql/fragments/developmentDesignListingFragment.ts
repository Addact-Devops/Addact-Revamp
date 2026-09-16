import { gql } from "graphql-request";
import { CMS_SERVICE_VARIANT_FIELDS } from "./cmsServiceVariantFragment";
import { AI_SERVICE_LIST_FIELDS } from "./aiServiceListFragment";
import { Image, Link } from "@/types/common";

export const DEVELOPMENT_DESIGN_LISTING_FRAGMENT = gql`
  fragment DevelopmentDesignListingFields on ComponentHomeDevelopmentAndDesignListing {
    id
    serviceTitle
    ${CMS_SERVICE_VARIANT_FIELDS}
    ${AI_SERVICE_LIST_FIELDS}
    isCarousel
  }
`;

export type ServiceListItem = {
  listingContext: {
    id: string;
    title: string | null;
    description: string | null;
    image: Image | null;
    link: Link | null;
  } | null;
};

export type OurServiceList = {
  id: string;
  isCarousel: boolean | null;
  serviceTitle: string | null;
  serviceVariant: {
    variant: string;
  } | null;
  serviceList: ServiceListItem[];
};

export type DevelopmentDesignListingType = OurServiceList;
