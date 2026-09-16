import { gql } from "graphql-request";
import type { Image, Link } from "@/types/common";

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

export type ServiceListContextItem = {
  listingContext: {
    title: string;
    description: string;
    image: Image | null;
    link: Link | null;
  };
  serviceDescription?: string | null;
  serviceLink?: Link | null;
};

export type OurServiceType = {
  isCarousel: boolean;
  serviceTitle: string;
  serviceDescription?: string | null;
  serviceLink?: Link | null;
  serviceVariant?: {
    variant: string;
  } | null;
  serviceList: ServiceListContextItem[];
};

