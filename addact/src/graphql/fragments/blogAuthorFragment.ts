import { BLOG_AUTHOR_DESIGNATION_FIELDS, type Designation } from "./blogAuthorDesignationFragment";
import type { ImageFragmentType } from "./imageFragment";
export type { Designation };

export const AUTHOR_INNER_FIELDS = `
  AuthorName
  AuthorDescription
`;

export const BLOG_AUTHOR_FIELDS = `
  author {
    Author {
      ${AUTHOR_INNER_FIELDS}
      AuthorImage {
        ...ImageFields
      }
      ${BLOG_AUTHOR_DESIGNATION_FIELDS}
    }
  }
`;

export type AuthorNameDescriptionType = {
  AuthorName?: string;
  AuthorDescription?: string;
};

export type AuthorDetails = AuthorNameDescriptionType & {
  AuthorImage?: ImageFragmentType;
  designation?: Designation;
};

export type BlogAuthorType = {
  author?: {
    Author?: AuthorDetails;
  };
};
