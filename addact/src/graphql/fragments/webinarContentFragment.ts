import { HEADING_INLINE_FIELDS } from "./headingFragment";
import type { BlogContentItem } from "./blogContentFragment";

export type WebinarContentItem = BlogContentItem;

export type WebinarContentType = {
  WebinarContent?: WebinarContentItem[];
};

export const WEBINAR_CONTENT_FIELDS = `
  WebinarContent {
    ${HEADING_INLINE_FIELDS}
    ... on ComponentBaseTemplateRichtext { ...RichtextFields }
    ... on ComponentSharedImage { ...SharedImageFields }
    ...LinkFields
  }
`;

