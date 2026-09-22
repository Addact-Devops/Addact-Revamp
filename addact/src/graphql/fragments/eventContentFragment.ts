import { Heading } from "@/types/common";
import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { RICHTEXT_FIELDS } from "./richtextFragment";
import { SHARED_IMAGE_FIELDS } from "./sharedImageFragment";
import { EVENT_CONTENT_SHARED_LINK_FIELDS } from "./eventContentSharedLinkFragment";

export const EVENT_CONTENT_FIELDS = `
  EventContent {
    ${BLOG_CONTENT_HEADINGS_FIELDS}
    ${RICHTEXT_FIELDS}
    ${SHARED_IMAGE_FIELDS}
    ${EVENT_CONTENT_SHARED_LINK_FIELDS}
  }
`;

export type EventContentType = {
  EventContent: Heading[];
};
