import { gql } from "graphql-request";
import { AI_LISTING_CONTEXT_FIELDS } from "./aiListingContextFragment";
import type { LinkFragmentType } from "./linkFragment";
import type { ImageFragmentType } from "./imageFragment";
import type { TitleDescriptionLowerType } from "./titleDescriptionFragment";

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

export type LinkWithIcon = LinkFragmentType;

export type Capability = Required<TitleDescriptionLowerType> & {
  link: LinkWithIcon;
  image: ImageFragmentType;
  sublinks: LinkWithIcon[];
};

export type OurCapabilitiy = {
  heading: string;
  capabilities: Capability[];
};

export type HomeCapabilitiesType = {
  ourCapabilitiy: OurCapabilitiy;
};

