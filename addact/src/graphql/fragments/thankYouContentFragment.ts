import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";

export const THANK_YOU_CONTENT_FIELDS = `
  Content {
    ... on ComponentBaseTemplateRichtext { ...RichtextFields }
    ...LinkFields
    ${BLOG_CONTENT_HEADINGS_FIELDS}
  }
`;
