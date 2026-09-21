import { BLOG_AUTHOR_DESIGNATION_FIELDS, type Designation } from "./blogAuthorDesignationFragment";
import type { AuthorDetails } from "./blogAuthorFragment";

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

export type WebinarAuthorDetails = AuthorDetails;

export type WebinarAuthorType = {
  Author?: WebinarAuthorDetails;
};

export type WebinarHostType = {
  Host: WebinarAuthorType[];
};

export type { Designation, AuthorDetails };


