import { ABOUT_US_CTA_TITLE_FIELDS, type AboutUsCtaTitle } from "./aboutUsCtaTitleFragment";
export type { AboutUsCtaTitle };
import type { ImageFragmentType } from "./imageFragment";
import type { LinkFragmentType } from "./linkFragment";
import { CTA_IMAGE_LINK_FIELDS, type DescriptionNode, type CTAImageItem } from "./ctaFragment";

export const ABOUT_US_CTA_FIELDS = `
  aboutUsCTA {
    ${ABOUT_US_CTA_TITLE_FIELDS}
    CTADescription
    ${CTA_IMAGE_LINK_FIELDS}
  }
`;

export type CTAImageType = ImageFragmentType;
export type CTALinkType = LinkFragmentType;
export type { DescriptionNode };

// CTAType.Title reuses Heading[] from AboutUsCtaTitle (aboutUsCtaTitleFragment.ts)
export type CTAType = {
  Title: AboutUsCtaTitle["Title"];
  CTADescription: DescriptionNode[];
  CTAImage: CTAImageItem[];
  CTALink: CTALinkType[];
};

export type AboutUsCTAResponse = {
  aboutUs: {
    aboutUsCTA: CTAType;
  };
};

