import { BLOG_AUTHOR_DESIGNATION_FIELDS, type Designation } from "./blogAuthorDesignationFragment";
import { AUTHOR_BASE_FIELDS, type AuthorDetails } from "./blogAuthorFragment";

export const WEBINAR_AUTHOR_FIELDS = `
  Author {
    ${AUTHOR_BASE_FIELDS}
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


