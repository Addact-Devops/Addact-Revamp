import { Heading } from "@/types/common";
import { HEADING_INLINE_FIELDS } from "./headingFragment";
import { SHARED_IMAGE_FIELDS } from "./sharedImageFragment";
import { RICHTEXT_FIELDS } from "./richtextFragment";

export const PRESS_CONTENT_FIELDS = `
  PressContent {
    ...LinkFields
    ${SHARED_IMAGE_FIELDS}
    ${HEADING_INLINE_FIELDS}
    ${RICHTEXT_FIELDS}
  }
`;

export type PressContentType = {
  PressContent: Heading[];
};
