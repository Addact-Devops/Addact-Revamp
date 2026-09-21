import { gql } from "graphql-request";
import { CMS_SERVICE_VARIANT_FIELDS, type CmsServiceVariantType } from "./cmsServiceVariantFragment";
import { AI_LISTING_CONTEXT_FIELDS, type AIListingContext } from "./aiListingContextFragment";
import type { Link } from "@/types/common";

export const OUR_SERVICE_FRAGMENT = gql`
  fragment OurServiceFields on ComponentHomeServiceList {
    isCarousel
    serviceTitle
    serviceDescription
    serviceLink {
      ...LinkFields
    }
    ${CMS_SERVICE_VARIANT_FIELDS}
    serviceList {
      listingContext {
        ${AI_LISTING_CONTEXT_FIELDS}
      }
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





