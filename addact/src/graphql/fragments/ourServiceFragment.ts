import { gql } from "graphql-request";
import { CMS_SERVICE_VARIANT_FIELDS, type CmsServiceVariantType } from "./cmsServiceVariantFragment";
import { AI_SERVICE_LIST_FIELDS } from "./aiServiceListFragment";
import type { AIListingContext } from "./aiListingContextFragment";
import type { Link } from "@/types/common";

export const COMPONENT_OUR_SERVICE_FIELDS = `
  ... on ComponentHomeServiceList {
    ...OurServiceFields
  }
`;

export const OUR_SERVICE_FIELDS = `
  ourService {
    ${COMPONENT_OUR_SERVICE_FIELDS}
  }
`;


export const OUR_SERVICE_FRAGMENT = gql`
  fragment OurServiceFields on ComponentHomeServiceList {
    isCarousel
    serviceTitle
    serviceDescription
    serviceLink {
      ...LinkFields
    }
    ${CMS_SERVICE_VARIANT_FIELDS}
    ${AI_SERVICE_LIST_FIELDS}
  }
`;


export type ServiceListContextItem = {
  listingContext: Omit<AIListingContext, "link"> & {
    link: Link | null;
  };
  serviceDescription?: string | null;
  serviceLink?: Link | null;
};

export type OurServiceType = CmsServiceVariantType & {
  isCarousel: boolean;
  serviceTitle: string;
  serviceDescription?: string | null;
  serviceLink?: Link | null;
  serviceList: ServiceListContextItem[];
};





