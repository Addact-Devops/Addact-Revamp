import { type LinkFragmentType } from "./linkFragment";

export const BLOG_CONTENT_SHARED_LINK_FIELDS = `
  ... on ComponentSharedLink {
    ...LinkFields
  }
`;

export type SharedLink = LinkFragmentType;
export type { LinkFragmentType };
