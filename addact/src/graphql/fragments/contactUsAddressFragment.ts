export const CONTACT_US_ADDRESS_FIELDS = `
  AddressContent {
    OfficeCountry
    OfficeCity
    Address
    ContactUsEmailPhone {
      Label
      Link
    }
    MapIframe
  }
`;

export type RichTextBlock = {
  type: string;
  children: {
    text: string;
    type?: string;
  }[];
};

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
