import { BLOG_CONTENT_INNER_FIELDS, type BlogContentItem } from "./blogContentFragment";

export const CASE_STUDY_CONTENT_FIELDS = `
  CaseStudyContent {
    ${BLOG_CONTENT_INNER_FIELDS}
  }
`;

export type CaseStudyContentItem = BlogContentItem;

export type CaseStudyContentType = {
  CaseStudyContent: CaseStudyContentItem[];
};

