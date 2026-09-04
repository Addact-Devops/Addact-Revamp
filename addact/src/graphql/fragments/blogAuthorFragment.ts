import { BLOG_AUTHOR_DESIGNATION_FIELDS } from "./blogAuthorDesignationFragment";

export const BLOG_AUTHOR_FIELDS = `
  author {
    Author {
      AuthorName
      AuthorDescription
      AuthorImage {
          ...ImageFields
        }
      ${BLOG_AUTHOR_DESIGNATION_FIELDS}
    }
  }
`;
