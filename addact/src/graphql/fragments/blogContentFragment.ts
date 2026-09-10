import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { BLOG_CONTENT_SHARED_LINK_FIELDS } from "./blogContentSharedLinkFragment";
import { BLOG_CONTENT_ERROR_FIELDS } from "./blogContentErrorFragment";

export const BLOG_CONTENT_FIELDS = `
  BlogContent {
    ${BLOG_CONTENT_HEADINGS_FIELDS}
    ... on ComponentSharedImage { ...SharedImageFields }
    ${BLOG_CONTENT_SHARED_LINK_FIELDS}
    ... on ComponentBaseTemplateRichtext { ...RichtextFields }
    ${BLOG_CONTENT_ERROR_FIELDS}
  }
`;

export type BlogContentItem = {
  id?: string;
  Richtext?: string;
  h1?: string;
  h2?: string;
  h3?: string;
  h4?: string;
  h5?: string;
  h6?: string;
  href?: string;
  label?: string;
  target?: string;
  isExternal?: boolean;
  Image?: {
    alternativeText?: string;
    name?: string;
    height?: number;
    url?: string;
    width?: number;
  };
};

export type BlogContentType = {
  BlogContent?: BlogContentItem[];
};

