import { BLOG_AUTHOR_DESIGNATION_FIELDS, type Designation } from "./blogAuthorDesignationFragment";
import type { ImageFragmentType } from "./imageFragment";
export type { Designation };

export const AUTHOR_BASE_FIELDS = `
  AuthorName
  AuthorImage {
    ...ImageFields
  }
`;

export const AUTHOR_INNER_FIELDS = `
  ${AUTHOR_BASE_FIELDS}
  AuthorDescription
`;

export const BLOG_AUTHOR_FIELDS = `
  author {
    Author {
      ${AUTHOR_INNER_FIELDS}
      ${BLOG_AUTHOR_DESIGNATION_FIELDS}
    }
  }
`;

export type CommonAuthorType = {
  AuthorName?: string | null;
  AuthorDescription?: string | null;
  AuthorMessage?: string | null;
  AuthorImage?: ImageFragmentType | null;
  designation?: Designation | null;
};

export type AuthorNameDescriptionType = Pick<CommonAuthorType, "AuthorName" | "AuthorDescription">;

export type AuthorDetails = CommonAuthorType;

export type BlogAuthorType = {
  author?: {
    Author?: AuthorDetails;
  };
};
