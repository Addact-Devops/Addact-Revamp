import { gql } from "graphql-request";
import { LISTING_CONTEXT_FIELDS, type AIListingContext } from "./aiListingContextFragment";
import type { Link } from "@/types/common";
import type { CmsServiceVariantType } from "./developmentDesignListingFragment";
export type { CmsServiceVariantType };

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
    serviceVariant {
      variant
    }
    serviceList {
      ${LISTING_CONTEXT_FIELDS}
    }
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





