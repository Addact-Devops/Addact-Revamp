import { ABOUT_US_CTA_TITLE_FIELDS } from "./aboutUsCtaTitleFragment";

export const ABOUT_US_CTA_FIELDS = `
  aboutUsCTA {
    ${ABOUT_US_CTA_TITLE_FIELDS}
    CTADescription
    CTAImage {
      ... on ComponentSharedImage {
        Image {
          ...ImageFields
        }
      }
    }
    CTALink {
      ... on ComponentSharedLink {
        ...LinkFields
      }
    }
  }
`;

export type CTAImageType = {
  url: string;
  alternativeText: string | null;
  width: number | null;
  height: number | null;
};

export type CTALinkType = {
  label: string;
  href: string;
  target: string | null;
  isExternal: boolean;
};

export type CtaTitle = { h1?: string } | { h2?: string } | { h3?: string };

export type DescriptionNode = {
  type: string;
  children: { text: string }[];
};

export type CTAType = {
  Title: CtaTitle[];
  CTADescription: DescriptionNode[];
  CTAImage: { Image: CTAImageType }[];
  CTALink: CTALinkType[];
};

export type AboutUsCTAResponse = {
  aboutUs: {
    aboutUsCTA: CTAType;
  };
};
