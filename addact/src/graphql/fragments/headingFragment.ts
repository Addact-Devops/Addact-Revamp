import { gql } from "graphql-request";
import type { Heading } from "@/types/common";

export const HEADING_SELECTION_FIELDS = `
  ... on ComponentHeadingsH1 { ...HeadingFields }
  ... on ComponentHeadingsH2 { ...Heading2Fields }
  ... on ComponentHeadingsH3 { ...Heading3Fields }
  ... on ComponentHeadingsH4 { ...Heading4Fields }
  ... on ComponentHeadingsH5 { ...Heading5Fields }
  ... on ComponentHeadingsH6 { ...Heading6Fields }
`;

export const HEADING_INLINE_FIELDS = `
  ... on ComponentHeadingsH1 { id h1 }
  ... on ComponentHeadingsH2 { id h2 }
  ... on ComponentHeadingsH3 { id h3 }
  ... on ComponentHeadingsH4 { id h5 }
  ... on ComponentHeadingsH5 { id h5 }
  ... on ComponentHeadingsH6 { id h6 }
`;

export const HEADING_FRAGMENT = gql`
  fragment HeadingFields on ComponentHeadingsH1 {
    h1
    id
  }
  fragment Heading2Fields on ComponentHeadingsH2 {
    h2
    id
  }
  fragment Heading3Fields on ComponentHeadingsH3 {
    h3
    id
  }
  fragment Heading4Fields on ComponentHeadingsH4 {
    h5
    id
  }
  fragment Heading5Fields on ComponentHeadingsH5 {
    h5
    id
  }
  fragment Heading6Fields on ComponentHeadingsH6 {
    h6
    id
  }
`;

export type HeadingFragmentType = Heading;
export type { Heading };
