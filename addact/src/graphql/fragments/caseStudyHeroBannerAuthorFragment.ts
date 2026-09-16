import { BLOG_AUTHOR_DESIGNATION_FIELDS, type Designation } from "./blogAuthorDesignationFragment";

export type CaseStudyAuthorType = {
  AuthorName?: string;
  designation?: Designation;
};

export type CaseStudyHeroBannerAuthorType = {
  author?: {
    Author?: CaseStudyAuthorType;
  };
};

export const CASE_STUDY_HERO_BANNER_AUTHOR_FIELDS = `
  author {
    Author {
      AuthorName
      ${BLOG_AUTHOR_DESIGNATION_FIELDS}
    }
  }
`;


