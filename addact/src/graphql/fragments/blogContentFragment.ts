import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { BLOG_CONTENT_SHARED_LINK_FIELDS } from "./blogContentSharedLinkFragment";
import { BLOG_CONTENT_ERROR_FIELDS } from "./blogContentErrorFragment";

export const BLOG_CONTENT_FIELDS = `
  BlogContent {
    ${BLOG_CONTENT_HEADINGS_FIELDS}
    ... on ComponentSharedImage { ...SharedImageFields }
    ${BLOG_CONTENT_SHARED_LINK_FIELDS}
    ... on ComponentBaseTemplateRichtext { ...RichtextFields }
    ${BLOG_CONTENT_ERROR_FIELDS}
  }
`;
