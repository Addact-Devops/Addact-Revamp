import { Heading } from "@/types/common";
import { HeadingFragmentType } from "./headingFragment";
import { ImageFragmentType } from "./imageFragment";
import { LinkFragmentType } from "./linkFragment";
import { CTA_TITLE_FIELDS } from "./ctaTitleFragment";

export const CTA_FIELDS = `
  ${CTA_TITLE_FIELDS}
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
  pageReference
`;

export type DescriptionNode = {
  type: string;
  children: { text: string }[];
};

export type CTAFragmentType = {
  Title: HeadingFragmentType[];
  CTADescription: string | null;
  CTAImage?: {
    Image: ImageFragmentType;
  }[];
  CTALink: LinkFragmentType[];
  pageReference?: string;
};

export type CTAImageItem = {
  Image: {
    alternativeText: string | null;
    height?: number | null;
    name?: string;
    url: string;
    width?: number | null;
  };
  id?: string;
};

export type CTALinkItem = {
  id: string;
  href: string;
  label?: string | null;
  target?: string | null;
  isExternal: boolean;
  SubDisc?: string | null;
  Icon?: CTAImageItem["Image"] | null;
};

export type CTA = {
  Title: Heading[];
  CTADescription?: string | null;
  CTAImage: CTAImageItem[];
  CTALink: CTALinkItem[];
  pageReference?: string;
};

export type CTAImage = {
  Image: {
    alternativeText: string | null;
    caption: string | null;
    width: number | null;
    height: number | null;
    url: string;
  };
};

export type CtaTitle = { h1: string } | { h2: string } | { h3: string } | { h5: string } | { h6: string };

export type CtaLink = {
  id: string;
  href: string;
  label: string;
  target: string | null;
  isExternal: boolean;
};

export type CtaBannerResponse = {
  home: {
    cta: {
      Title: CtaTitle[];
      CTAImage: CTAImage;
      CTALink: CtaLink;
    };
  };
};
