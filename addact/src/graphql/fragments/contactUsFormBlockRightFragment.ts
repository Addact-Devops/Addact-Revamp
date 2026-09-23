import type { RichTextBlock } from "@/types/common";

export type ContactUsFormBlockRightType = {
  RightTitle?: string;
  RightDescription?: RichTextBlock[] | string[] | string;
  RecipientEmails?: string;
};

export const CONTACT_US_FORM_BLOCK_RIGHT_FIELDS = `
  RightTitle
  RightDescription
  RecipientEmails
`;

