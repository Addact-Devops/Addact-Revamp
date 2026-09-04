import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { EVENT_CONTENT_SHARED_LINK_FIELDS } from "./eventContentSharedLinkFragment";

export const EVENT_CONTENT_FIELDS = `
  EventContent {
    ${BLOG_CONTENT_HEADINGS_FIELDS}
    ... on ComponentBaseTemplateRichtext { ...RichtextFields }
    ... on ComponentSharedImage { ...SharedImageFields }
    ${EVENT_CONTENT_SHARED_LINK_FIELDS}
  }
`;
