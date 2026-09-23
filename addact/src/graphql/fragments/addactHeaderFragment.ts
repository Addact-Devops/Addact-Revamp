import type { HeaderImage } from "./imageFragment";
import type { HeaderCard } from "./headerCardFragment";
import type { HeaderLink } from "./linkFragment";
import type { HeaderMenuItem } from "./headerLayer1Fragment";

export const ADDACT_HEADER_FIELDS = `
  logo {
    ...ImageFields
  }
  contactButton {
    ...HeaderCardFields
  }
  menu(pagination: { limit: -1 }) {
    ...HeaderLayer1Fields
  }
  additionalText
  contactDetails {
    ...LinkFields
  }
`;

export type AddactHeaderData = {
  logo?: HeaderImage;
  contactButton?: HeaderCard;
  menu?: HeaderMenuItem[];
  additionalText?: string;
  contactDetails?: HeaderLink[];
};

