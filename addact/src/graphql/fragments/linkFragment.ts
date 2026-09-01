import { gql } from "graphql-request";
import { ImageFragmentType } from "./imageFragment";

export const LINK_FRAGMENT = gql`
  fragment LinkFields on ComponentSharedLink {
    id
    href
    label
    target
    isExternal
    SubDisc
    Icon {
      ...ImageFields
    }
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
