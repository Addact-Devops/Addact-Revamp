import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import type { HeadingFragmentType } from "./headingFragment";
import type { ImageFragmentType } from "./imageFragment";

export type SharedImageWrapper = {
  Image?: ImageFragmentType;
};

export type OurPartnerItem = {
  Title?: HeadingFragmentType[];
  Image?: SharedImageWrapper;
};

export type OurPartnerType = {
  OurPartner?: OurPartnerItem;
};

export const OUR_PARTNER_INNER_FIELDS = `
  Title {
    ${BLOG_CONTENT_HEADINGS_FIELDS}
  }
  Image {
    ... on ComponentSharedImage { ...SharedImageFields }
  }
`;

export const OUR_PARTNER_FIELDS = `
  OurPartner {
    ${OUR_PARTNER_INNER_FIELDS}
  }
`;


