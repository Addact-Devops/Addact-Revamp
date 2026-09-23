import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import type { HeadingFragmentType } from "./headingFragment";
import type { ImageFragmentType } from "./imageFragment";
import type { LinkFragmentType } from "./linkFragment";

export type SharedImageWrapper = {
  Image?: ImageFragmentType;
};

export type ServiceListCta2Item = {
  CTADescription?: string;
  pageReference?: string;
  CTAImage?: SharedImageWrapper;
  CTALink?: LinkFragmentType;
  Title?: HeadingFragmentType[];
};

export type ServiceListCta2Type = {
  cta2?: ServiceListCta2Item;
};

export interface CTA2 {
  CTADescription?: Record<string, unknown>[];
  CTAImage: {
    Image: ImageFragmentType;
  }[];
  CTALink: LinkFragmentType[];
  Title: HeadingFragmentType[];
}

export const SERVICE_LIST_CTA2_FIELDS = `
  cta2 {
    CTADescription
    pageReference
    CTAImage {
      ... on ComponentSharedImage { ...SharedImageFields }
    }
    CTALink {
      ...LinkFields
    }
    Title {
      ${BLOG_CONTENT_HEADINGS_FIELDS}
    }
  }
`;


