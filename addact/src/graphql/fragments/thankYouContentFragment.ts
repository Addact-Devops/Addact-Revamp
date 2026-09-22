import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import type { Heading, Link } from "@/types/common";
import type { HeadingFragmentType } from "./headingFragment";
import type { LinkFragmentType } from "./linkFragment";
import type { RichtextFragmentType } from "./richtextFragment";

export type ThankYouContentItem = HeadingFragmentType | LinkFragmentType | RichtextFragmentType;

export type ThankYouContentType = {
  Content?: ThankYouContentItem[];
};

export type Content = {
  id: string;
  h1?: Heading["h1"];
  Richtext?: RichtextFragmentType["Richtext"];
} & Partial<Omit<Link, "id">>;

export const THANK_YOU_CONTENT_FIELDS = `
  Content {
    ... on ComponentBaseTemplateRichtext { ...RichtextFields }
    ...LinkFields
    ${BLOG_CONTENT_HEADINGS_FIELDS}
  }
`;
