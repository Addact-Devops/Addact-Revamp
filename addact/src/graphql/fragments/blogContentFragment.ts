import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { SHARED_IMAGE_FIELDS } from "./sharedImageFragment";
import { BLOG_CONTENT_SHARED_LINK_FIELDS } from "./blogContentSharedLinkFragment";
import { RICHTEXT_FIELDS } from "./richtextFragment";
import { BLOG_CONTENT_ERROR_FIELDS } from "./blogContentErrorFragment";
import type { HeadingFragmentType } from "./headingFragment";
import type { HeaderLink } from "./linkFragment";
import type { ImageFragmentType } from "./imageFragment";

export const BLOG_CONTENT_INNER_FIELDS = `
  ${BLOG_CONTENT_HEADINGS_FIELDS}
  ${SHARED_IMAGE_FIELDS}
  ${BLOG_CONTENT_SHARED_LINK_FIELDS}
  ${RICHTEXT_FIELDS}
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
