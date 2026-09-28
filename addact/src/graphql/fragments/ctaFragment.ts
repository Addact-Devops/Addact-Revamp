import { HEADING_INLINE_FIELDS, type HeadingFragmentType } from "./headingFragment";
import type { ImageFragmentType } from "./imageFragment";
import type { LinkFragmentType } from "./linkFragment";

export const CTA_FIELDS = `
  slug
  pageReference
  Title {
    ${HEADING_INLINE_FIELDS}
  }
  CTADescription
  CTAImage {
    ... on ComponentSharedImage {
      Image {
        ...ImageFields
      }
      tooltip
    }
  }
  CTALink {
    ... on ComponentSharedLink {
      ...LinkFields
    }
  }
`;

export type DescriptionNode = {
  type: string;
  children: { text: string }[];
};

export type CTAImageItem = {
  Image: ImageFragmentType;
  tooltip?: string | null;
  id?: string;
};

export type CTALinkItem = LinkFragmentType & {
  id?: string;
};

// Base CTA type
export type CTA = {
  Title: HeadingFragmentType[];
  CTADescription?: DescriptionNode[];
  CTAImage: CTAImageItem[];
  CTALink: CTALinkItem[];
  pageReference?: string;
  slug?: string;
};

// DRY aliases & extensions
export type CTAFragmentType = CTA;
export type CTAImage = CTAImageItem;
export type CtaTitle = HeadingFragmentType;
export type CtaLink = LinkFragmentType;

export type CTA2 = CTA & {
  CTAImage: CTAImageItem[] & ImageFragmentType;
  CTALink: CTALinkItem[] & LinkFragmentType;
  CtaDescription?: string;
  CtaImage?: ImageFragmentType;
  CtaLink?: LinkFragmentType;
  CtaTitle?: string;
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


