import { OUR_PARTNER_INNER_FIELDS, type SharedImageWrapper } from "./ourPartnerFragment";
import type { HeadingFragmentType } from "./headingFragment";

export const OUR_PARTNER_HOME_FIELDS = `
  ourpartner {
    ${OUR_PARTNER_INNER_FIELDS}
  }
`;

export type PartnerImage = SharedImageWrapper;

export type PartnerTitle = HeadingFragmentType;

export type OurPartnerResponse = {
  home: {
    ourpartner: {
      Title: PartnerTitle[];
      Image: PartnerImage[];
    };
  };
};
