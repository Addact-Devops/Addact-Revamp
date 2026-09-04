import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { BLOG_CONTENT_SHARED_LINK_FIELDS } from "./blogContentSharedLinkFragment";
import { BLOG_CONTENT_ERROR_FIELDS } from "./blogContentErrorFragment";

export const CASE_STUDY_CONTENT_FIELDS = `
  CaseStudyContent {
    ${BLOG_CONTENT_HEADINGS_FIELDS}
    ${BLOG_CONTENT_SHARED_LINK_FIELDS}
    ... on ComponentSharedImage { ...SharedImageFields }
    ... on ComponentBaseTemplateRichtext { ...RichtextFields }
    ${BLOG_CONTENT_ERROR_FIELDS}
  }
`;
