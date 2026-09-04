import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { BLOG_CONTENT_SHARED_LINK_FIELDS } from "./blogContentSharedLinkFragment";

export const BRAND_GUIDELINES_CONTENT_FIELDS = `
  Content {
    ${BLOG_CONTENT_HEADINGS_FIELDS}
    ... on ComponentBaseTemplateRichtext { ...RichtextFields }
    ... on ComponentSharedImage { ...SharedImageFields }
    ${BLOG_CONTENT_SHARED_LINK_FIELDS}
  }
`;
