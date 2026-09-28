import type { Heading } from "@/types/common";
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

export type CTAFragmentType = {
  slug?: string;
  pageReference?: string;
  Title?: HeadingFragmentType[];
  CTADescription?: DescriptionNode[];
  CTAImage?: CTAImageItem[];
  CTALink?: LinkFragmentType[];
};

export type CTALinkItem = LinkFragmentType & {
  id: string;
};

export type CTA = {
  Title: Heading[];
  CTADescription?: string | null;
  CTAImage: CTAImageItem[];
  CTALink: CTALinkItem[];
  pageReference?: string;
};

export type CTAImage = CTAImageItem;

export type CtaTitle = HeadingFragmentType;

export type CtaLink = LinkFragmentType;

export type CtaBannerResponse = {
  home: {
    cta: {
      Title: CtaTitle[];
      CTAImage: CTAImage;
      CTALink: CtaLink;
    };
  };
};

