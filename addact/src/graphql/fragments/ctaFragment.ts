import { HeadingFragmentType } from "./headingFragment";
import { ImageFragmentType } from "./imageFragment";
import { LinkFragmentType } from "./linkFragment";

export const CTA_FIELDS = `
  Title {
    ... on ComponentHeadingsH1 { ...HeadingFields }
    ... on ComponentHeadingsH2 { ...Heading2Fields }
    ... on ComponentHeadingsH3 { ...Heading3Fields }
    ... on ComponentHeadingsH4 { ...Heading4Fields }
    ... on ComponentHeadingsH5 { ...Heading5Fields }
    ... on ComponentHeadingsH6 { ...Heading6Fields }
  }
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
