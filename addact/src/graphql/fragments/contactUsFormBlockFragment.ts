import type { ImageFragmentType } from "./imageFragment";
import type { RichTextBlock } from "@/types/common";

export type ContactUsFormBlockLeftType = {
  LeftTitle?: string;
  LeftDescription?: RichTextBlock[] | string[] | string;
  LeftBackgroundImage?: ImageFragmentType;
};

export type ContactUsFormBlockRightType = {
  RightTitle?: string;
  RightDescription?: RichTextBlock[] | string[] | string;
  RecipientEmails?: string;
};

export type ContactUsFormBlockData = ContactUsFormBlockLeftType & ContactUsFormBlockRightType;

export type ContactUsFormBlockType = {
  ContactUsFormBlock: ContactUsFormBlockData;
};

export const CONTACT_US_FORM_BLOCK_FIELDS = `
  ContactUsFormBlock {
    LeftTitle
    LeftDescription
    LeftBackgroundImage {
      ...ImageFields
    }
    RightTitle
    RightDescription
    RecipientEmails
  }
`;
