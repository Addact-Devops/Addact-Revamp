import { ImageFragmentType } from "./imageFragment";

export type HeaderLogoType = {
  HeaderLogo?: ImageFragmentType;
};

export const HEADER_LOGO_FIELDS = `
  HeaderLogo {
    ...ImageFields
  }
`;


