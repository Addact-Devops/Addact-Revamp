import { gql } from "graphql-request";
import type { ImageFragmentType } from "./imageFragment";

export const LINK_INNER_FIELDS = `
  id
  href
  label
  target
  isExternal
  SubDisc
  Icon {
    ...ImageFields
  }
`;

export const COMPONENT_LINK_FIELDS = `
  ... on ComponentSharedLink {
    ...LinkFields
  }
`;

export const LINK_FRAGMENT = gql`
  fragment LinkFields on ComponentSharedLink {
    ${LINK_INNER_FIELDS}
  }
`;

export type LinkFragmentType = {
  id?: string;
  href: string;
  label: string | null;
  target?: string | null;
  isExternal: boolean;
  SubDisc?: string | null;
  Icon?: {
    id?: string;
    Image?: ImageFragmentType | null;
  } | ImageFragmentType | null;
};

// Header-specific link type with optional fields (derived from LinkFragmentType)
export type HeaderLink = Partial<Omit<LinkFragmentType, "Icon">> & {
  Icon?: ImageFragmentType;
};
