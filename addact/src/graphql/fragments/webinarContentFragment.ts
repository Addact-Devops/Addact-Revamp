import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";

export const WEBINAR_CONTENT_FIELDS = `
  WebinarContent {
    ${BLOG_CONTENT_HEADINGS_FIELDS}
    ... on ComponentBaseTemplateRichtext { ...RichtextFields }
    ... on ComponentSharedImage { ...SharedImageFields }
    ...LinkFields
  }
`;
