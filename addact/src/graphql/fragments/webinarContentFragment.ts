import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import type { BlogContentItem } from "./blogContentFragment";

export type WebinarContentItem = BlogContentItem;

export type WebinarContentType = {
  WebinarContent?: WebinarContentItem[];
};

export const WEBINAR_CONTENT_FIELDS = `
  WebinarContent {
    ${BLOG_CONTENT_HEADINGS_FIELDS}
    ... on ComponentBaseTemplateRichtext { ...RichtextFields }
    ... on ComponentSharedImage { ...SharedImageFields }
    ...LinkFields
  }
`;

