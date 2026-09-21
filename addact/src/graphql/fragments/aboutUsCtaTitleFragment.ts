import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { type HeadingFragmentType } from "./headingFragment";

export const ABOUT_US_CTA_TITLE_FIELDS = `
  Title {
    ${BLOG_CONTENT_HEADINGS_FIELDS}
  }
`;

export type AboutUsCtaTitle = {
  Title: HeadingFragmentType[];
};

