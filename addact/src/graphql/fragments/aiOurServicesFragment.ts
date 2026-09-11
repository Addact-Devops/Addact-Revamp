import { gql } from "graphql-request";
import { AI_LISTING_CONTEXT_FIELDS } from "./aiListingContextFragment";
import { AI_SERVICE_LIST_FIELDS } from "./aiServiceListFragment";
import { Image } from "@/types/common";
// Re-using LinkWithIcon from homeCapabilitiesFragment to avoid duplicate type definitions
import { type LinkWithIcon } from "./homeCapabilitiesFragment";

export const AI_OUR_SERVICES_FRAGMENT = gql`
  fragment AiOurServicesFields on ComponentHomeAiOurServices {
    listingContext {
      ${AI_LISTING_CONTEXT_FIELDS}
    }
    ${AI_SERVICE_LIST_FIELDS}
  }
`;

export type { LinkWithIcon };

export type OurService = {
  listingContext: {
    title: string;
    description: string;
    image: Image;
    link: LinkWithIcon;
  };
  serviceList: {
    listingContext: {
      id: string;
      title: string;
      description: string;
      image: Image;
      link: LinkWithIcon;
    };
  }[];
};
