import { BLOG_AUTHOR_DESIGNATION_FIELDS } from "./blogAuthorDesignationFragment";

export const WEBINAR_AUTHOR_FIELDS = `
  Author {
    AuthorImage {
      ...ImageFields
    }
    AuthorName
    ${BLOG_AUTHOR_DESIGNATION_FIELDS}
  }
`;

export const WEBINAR_HOST_FIELDS = `
  Host {
    ${WEBINAR_AUTHOR_FIELDS}
  }
`;

