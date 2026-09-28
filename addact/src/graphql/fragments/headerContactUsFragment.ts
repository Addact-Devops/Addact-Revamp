import type { LinkFragmentType } from "./linkFragment";

export type HeaderContactUsType = {
  contact_us?: LinkFragmentType[];
};

export const HEADER_CONTACT_US_FIELDS = `
  contact_us {
    ...LinkFields
  }
`;


