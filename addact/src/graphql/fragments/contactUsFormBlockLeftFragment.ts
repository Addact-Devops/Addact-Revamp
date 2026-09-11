import { ImageFragmentType } from "./imageFragment";

export type ContactUsFormBlockLeftType = {
  LeftTitle?: string;
  LeftDescription?: string;
  LeftBackgroundImage?: ImageFragmentType;
};

export const CONTACT_US_FORM_BLOCK_LEFT_FIELDS = `
  LeftTitle
  LeftDescription
  LeftBackgroundImage {
    ...ImageFields
  }
`;

