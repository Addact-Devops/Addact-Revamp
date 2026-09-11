import { CONTACT_US_FORM_BLOCK_LEFT_FIELDS } from "./contactUsFormBlockLeftFragment";
import { CONTACT_US_FORM_BLOCK_RIGHT_FIELDS } from "./contactUsFormBlockRightFragment";
import { Image } from "@/types/common";

export const CONTACT_US_FORM_BLOCK_FIELDS = `
  ContactUsFormBlock {
    ${CONTACT_US_FORM_BLOCK_LEFT_FIELDS}
    ${CONTACT_US_FORM_BLOCK_RIGHT_FIELDS}
  }
`;

export type ContactUsFormBlockData = {
  LeftTitle: string;
  LeftDescription: string;
  LeftBackgroundImage: Image;
  RightTitle: string;
  RightDescription: string;
  RecipientEmails: string;
};

export type ContactUsFormBlockType = {
  ContactUsFormBlock: ContactUsFormBlockData;
};
