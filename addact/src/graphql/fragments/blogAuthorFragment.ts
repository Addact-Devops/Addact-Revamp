import { BLOG_AUTHOR_DESIGNATION_FIELDS, type Designation } from "./blogAuthorDesignationFragment";
export type { Designation };


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
        url?: string;
        width?: number;
        height?: number;
        name?: string;
        alternativeText?: string;
      };
      designation?: Designation;
    };
  };
};


