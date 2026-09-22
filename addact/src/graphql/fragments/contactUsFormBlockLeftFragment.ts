import type { ImageFragmentType } from "./imageFragment";
import type { RichTextBlock } from "@/types/common";

export type ContactUsFormBlockLeftType = {
  LeftTitle?: string;
  LeftDescription?: RichTextBlock[] | string[] | string;
  LeftBackgroundImage?: ImageFragmentType;
};

export const CONTACT_US_FORM_BLOCK_LEFT_FIELDS = `
  LeftTitle
  LeftDescription
  LeftBackgroundImage {
    ...ImageFields
  }
`;

