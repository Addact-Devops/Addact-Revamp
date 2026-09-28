import type { Heading } from "@/types/common";

export const HEADING_INLINE_FIELDS = `
  ... on ComponentHeadingsH1 { id h1 }
  ... on ComponentHeadingsH2 { id h2 }
  ... on ComponentHeadingsH3 { id h3 }
  ... on ComponentHeadingsH4 { id h5 }
  ... on ComponentHeadingsH5 { id h5 }
  ... on ComponentHeadingsH6 { id h6 }
`;

export const HEADING_SELECTION_FIELDS = HEADING_INLINE_FIELDS;

export const HEADING_FRAGMENT = "";

export type HeadingFragmentType = Heading;
export type ContentHeading = HeadingFragmentType;
export type { Heading };
