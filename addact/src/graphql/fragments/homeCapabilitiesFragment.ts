import { gql } from "graphql-request";
import { AI_LISTING_CONTEXT_FIELDS } from "./aiListingContextFragment";
import { Image } from "@/types/common";

export const HOME_CAPABILITIES_FRAGMENT = gql`
  fragment HomeCapabilitiesFields on Home {
    ourCapabilitiy {
      heading
      capabilities {
        ${AI_LISTING_CONTEXT_FIELDS}
        sublinks {
          ...LinkFields
        }
      }
    }
  }
`;

export type LinkWithIcon = {
  id: string;
  href: string;
  label: string | null;
  target: string;
  isExternal: boolean;
  SubDisc: string | null;
  Icon: Image | null;
};

export type Capability = {
  title: string;
  description: string;
  link: LinkWithIcon;
  image: Image;
  sublinks: LinkWithIcon[];
};

export type OurCapabilitiy = {
  heading: string;
  capabilities: Capability[];
};

export type HomeCapabilitiesType = {
  ourCapabilitiy: OurCapabilitiy;
};

