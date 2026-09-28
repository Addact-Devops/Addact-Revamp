import type { AuthorDetails } from "./blogAuthorFragment";

export const WEBINAR_AUTHOR_FIELDS = `
  Author {
    AuthorName
    AuthorImage {
      ...ImageFields
    }
    designation {
      DesignationTitle
    }
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
