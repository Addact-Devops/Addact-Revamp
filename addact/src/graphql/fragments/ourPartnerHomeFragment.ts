import { OUR_PARTNER_INNER_FIELDS } from "./ourPartnerFragment";

export const OUR_PARTNER_HOME_FIELDS = `
  ourpartner {
    ${OUR_PARTNER_INNER_FIELDS}
  }
`;

export type PartnerImage = {
  Image: {
    url: string;
    alternativeText: string | null;
  };
};

export type PartnerTitle =
  | { h1: string }
  | { h2: string }
  | { h3: string }
  | { h5: string }
  | { h6: string };

export type OurPartnerResponse = {
  home: {
    ourpartner: {
      Title: PartnerTitle[];
      Image: PartnerImage[];
    };
  };
};
