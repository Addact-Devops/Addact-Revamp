import type { Image, Link } from "@/types/common";
import type { ImageFragmentType } from "./imageFragment";
import type { LinkFragmentType } from "./linkFragment";

export const BANNER_TITLE_DESCRIPTION_FIELDS = `
  BannerTitle
  BannerDescription
`;

export const BANNER_IMAGE_FIELDS = `
  BannerImage {
    ...ImageFields
  }
`;

export const BANNER_IMAGE_LINK_FIELDS = `
  BannerTitle
  BannerDescription
  BannerImage {
    ...ImageFields
  }
  BannerLink {
    ...LinkFields
  }
`;


export type BannerTitleDescriptionType = {
  BannerTitle?: string | null;
  BannerDescription?: string | null;
};

export type ChipsTextItem = {
  Title: string;
};

// Raw inner fields inside ComponentBannerBanner
export const COMPONENT_BANNER_INNER_FIELDS = `
  BannerTitle
  BannerDescription
  BannerLogo {
    ...ImageFields
  }
  BannerImage {
    ...ImageFields
  }
  isTextAlignCenter
  isVideo
  show_searchbox
  videoLink
  BannerLink {
    ...LinkFields
  }
  chipsText {
    Title
  }
`;

// Union member selection block (... on ComponentBannerBanner)
export const COMPONENT_BANNER_FIELDS = `
  ... on ComponentBannerBanner {
    ${COMPONENT_BANNER_INNER_FIELDS}
  }
`;



export type BannerLink = Link;

export type ComponentBannerItem = BannerTitleDescriptionType & {
  BannerLogo?: Image | null;
  BannerImage?: Image | ImageFragmentType | null;
  isTextAlignCenter?: boolean | null;
  isVideo?: boolean | null;
  show_searchbox?: boolean | null;
  videoLink?: string | null;
  BannerLink?: Link | LinkFragmentType | null;
  chipsText?: ChipsTextItem[] | null;
};

export type BannerSection = {
  Banner: ComponentBannerItem[];
};

export type HeroBannerFragmentType = ComponentBannerItem;
export type BannerItem = ComponentBannerItem;
