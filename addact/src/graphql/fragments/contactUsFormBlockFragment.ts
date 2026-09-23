import { CONTACT_US_FORM_BLOCK_LEFT_FIELDS, type ContactUsFormBlockLeftType } from "./contactUsFormBlockLeftFragment";
import { CONTACT_US_FORM_BLOCK_RIGHT_FIELDS, type ContactUsFormBlockRightType } from "./contactUsFormBlockRightFragment";

export const CONTACT_US_FORM_BLOCK_FIELDS = `
  ContactUsFormBlock {
    ${CONTACT_US_FORM_BLOCK_LEFT_FIELDS}
    ${CONTACT_US_FORM_BLOCK_RIGHT_FIELDS}
  }
`;

export type ContactUsFormBlockData = ContactUsFormBlockLeftType & ContactUsFormBlockRightType;

export type ContactUsFormBlockType = {
  ContactUsFormBlock: ContactUsFormBlockData;
};

