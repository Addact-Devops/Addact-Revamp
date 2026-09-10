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

export type BlogAuthorType = {
  author?: {
    Author?: {
      AuthorName?: string;
      AuthorDescription?: string;
      AuthorImage?: {
        alternativeText?: string;
        height?: number;
        width?: number;
        url?: string;
        name?: string;
      };
      designation?: { DesignationTitle?: string };
    };
  };
};

