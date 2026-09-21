import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { BLOG_CONTENT_SHARED_LINK_FIELDS } from "./blogContentSharedLinkFragment";
import { BLOG_CONTENT_ERROR_FIELDS } from "./blogContentErrorFragment";
import type { HeadingFragmentType } from "./headingFragment";
import type { HeaderLink } from "./linkFragment";
import type { ImageFragmentType } from "./imageFragment";

export const BLOG_CONTENT_INNER_FIELDS = `
  ${BLOG_CONTENT_HEADINGS_FIELDS}
  ... on ComponentSharedImage { ...SharedImageFields }
  ${BLOG_CONTENT_SHARED_LINK_FIELDS}
  ... on ComponentBaseTemplateRichtext { ...RichtextFields }
  ${BLOG_CONTENT_ERROR_FIELDS}
`;

export const BLOG_CONTENT_FIELDS = `
  BlogContent {
    ${BLOG_CONTENT_INNER_FIELDS}
  }
`;

export type BlogContentItem = HeadingFragmentType &
  HeaderLink & {
    Richtext?: string;
    Image?: ImageFragmentType;
  };

export type BlogContentType = {
  BlogContent?: BlogContentItem[];
};
