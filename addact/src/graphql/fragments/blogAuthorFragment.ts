import type { ImageFragmentType } from "./imageFragment";

export type BaseAuthorType = {
  AuthorName?: string;
  AuthorImage?: ImageFragmentType;
};

export type Designation = {
  DesignationTitle?: string;
};

export type AuthorDetails = BaseAuthorType & {
  AuthorDescription?: string;
  designation?: Designation;
};

export type CommonAuthorType = BaseAuthorType & {
  AuthorMessage?: string;
};

export type BlogAuthorType = {
  author?: {
    Author?: AuthorDetails;
  };
};
