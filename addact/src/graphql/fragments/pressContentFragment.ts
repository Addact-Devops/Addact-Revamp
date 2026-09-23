import { Heading } from "@/types/common";
import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { SHARED_IMAGE_FIELDS } from "./sharedImageFragment";
import { RICHTEXT_FIELDS } from "./richtextFragment";

export const PRESS_CONTENT_FIELDS = `
  PressContent {
    ...LinkFields
    ${SHARED_IMAGE_FIELDS}
    ${BLOG_CONTENT_HEADINGS_FIELDS}
    ${RICHTEXT_FIELDS}
  }
`;

export type PressContentType = {
  PressContent: Heading[];
};
