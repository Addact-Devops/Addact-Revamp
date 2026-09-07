import { BLOG_AUTHOR_DESIGNATION_FIELDS } from "./blogAuthorDesignationFragment";

export const CASE_STUDY_HERO_BANNER_AUTHOR_FIELDS = `
  author {
    Author {
      AuthorName
      ${BLOG_AUTHOR_DESIGNATION_FIELDS}
    }
  }
`;

