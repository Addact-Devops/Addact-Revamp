import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import type { HeadingFragmentType } from "./headingFragment";
import type { LinkFragmentType } from "./linkFragment";
import type { RichtextFragmentType } from "./richtextFragment";

export type ThankYouContentItem = HeadingFragmentType | LinkFragmentType | RichtextFragmentType;

export type ThankYouContentType = {
  Content?: ThankYouContentItem[];
};

export interface Content {
  id: string;
  h1?: string;
  Richtext?: string;
  href?: string;
  label?: string;
  target?: string;
  isExternal?: boolean;
}

export const THANK_YOU_CONTENT_FIELDS = `
  Content {
    ... on ComponentBaseTemplateRichtext { ...RichtextFields }
    ...LinkFields
    ${BLOG_CONTENT_HEADINGS_FIELDS}
  }
`;

