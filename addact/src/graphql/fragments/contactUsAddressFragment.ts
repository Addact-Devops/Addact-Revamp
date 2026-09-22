import type { RichTextBlock } from "@/types/common";

export const CONTACT_US_EMAIL_PHONE_FIELDS = `
  ContactUsEmailPhone {
    Label
    Link
  }
`;

export const CONTACT_US_ADDRESS_FIELDS = `
  AddressContent {
    OfficeCountry
    OfficeCity
    Address
    ${CONTACT_US_EMAIL_PHONE_FIELDS}
    MapIframe
  }
`;

export type ContactUsEmailPhoneItem = {
  Label: string;
  Link: string;
};

export type AddressContentData = {
  OfficeCountry: string;
  OfficeCity: string;
  Address: string;
  ContactUsEmailPhone: ContactUsEmailPhoneItem[];
  MapIframe: RichTextBlock[];
};

export type ContactUsAddressType = {
  AddressContent: AddressContentData;
};

export type { RichTextBlock };
