import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";

export const PRESS_CONTENT_FIELDS = `
  PressContent {
    ...LinkFields
    ... on ComponentSharedImage { ...SharedImageFields }
    ${BLOG_CONTENT_HEADINGS_FIELDS}
    ... on ComponentBaseTemplateRichtext { ...RichtextFields }
  }
`;

