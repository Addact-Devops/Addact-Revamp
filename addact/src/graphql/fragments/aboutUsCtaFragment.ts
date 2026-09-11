import { ABOUT_US_CTA_TITLE_FIELDS, type AboutUsCtaTitle } from "./aboutUsCtaTitleFragment";
export type { AboutUsCtaTitle };

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

export type DescriptionNode = {
  type: string;
  children: { text: string }[];
};

// CTAType.Title reuses Heading[] from AboutUsCtaTitle (aboutUsCtaTitleFragment.ts)
export type CTAType = {
  Title: AboutUsCtaTitle["Title"];
  CTADescription: DescriptionNode[];
  CTAImage: { Image: CTAImageType }[];
  CTALink: CTALinkType[];
};

export type AboutUsCTAResponse = {
  aboutUs: {
    aboutUsCTA: CTAType;
  };
};

