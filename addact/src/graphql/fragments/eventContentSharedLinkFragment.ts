import type { LinkFragmentType } from "./linkFragment";

export type EventContentSharedLinkType = LinkFragmentType;

export const EVENT_CONTENT_SHARED_LINK_FIELDS = `
  ... on ComponentSharedLink {
    ...LinkFields
  }
`;


