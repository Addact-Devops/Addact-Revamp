import { Image } from "@/types/common";
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

export type WebinarAuthorType = {
  Author: {
    AuthorImage: Image;
    AuthorName: string;
    designation: {
      DesignationTitle: string;
    };
  };
};

export type WebinarHostType = {
  Host: WebinarAuthorType[];
};
