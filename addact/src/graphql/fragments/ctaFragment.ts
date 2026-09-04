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
