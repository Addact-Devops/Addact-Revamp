import type { Heading } from "@/types/common";
import type { HeadingFragmentType } from "./headingFragment";
import type { ImageFragmentType } from "./imageFragment";
import type { LinkFragmentType } from "./linkFragment";
import { CTA_TITLE_FIELDS } from "./ctaTitleFragment";

export const CTA_IMAGE_LINK_FIELDS = `
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
`;

export const CTA_FIELDS = `
  ${CTA_TITLE_FIELDS}
  CTADescription
  ${CTA_IMAGE_LINK_FIELDS}
  pageReference
`;

export type DescriptionNode = {
  type: string;
  children: { text: string }[];
};

export type CTAFragmentType = {
  Title: HeadingFragmentType[];
  CTADescription?: string | null;
  CTAImage?: CTAImageItem[];
  CTALink?: LinkFragmentType[];
  pageReference?: string;
};

export type CTAImageItem = {
  Image: ImageFragmentType;
  id?: string;
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

