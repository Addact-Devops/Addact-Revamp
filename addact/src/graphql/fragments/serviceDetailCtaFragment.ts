import { HEADING_INLINE_FIELDS } from "./headingFragment";
import type { HeadingFragmentType } from "./headingFragment";
import type { ImageFragmentType } from "./imageFragment";
import type { LinkFragmentType } from "./linkFragment";

export type ServiceDetailCtaType = {
  CTADescription?: string;
  CTAImage?: ImageFragmentType;
  CTALink?: LinkFragmentType;
  Title?: HeadingFragmentType[];
};

export interface CTA2 {
  CtaDescription?: string;
  CtaImage?: ImageFragmentType;
  CtaLink?: LinkFragmentType;
  CtaTitle?: string;
  CTAImage?: ImageFragmentType;
  CTALink?: LinkFragmentType;
  Title?: HeadingFragmentType[];
}

export const SERVICE_DETAIL_CTA_FIELDS = `
  CTADescription
  CTAImage {
    ...ImageFields
  }
  CTALink {
    ...LinkFields
  }
  Title {
    ${HEADING_INLINE_FIELDS}
  }
`;



