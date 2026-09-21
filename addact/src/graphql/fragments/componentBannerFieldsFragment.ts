import { gql } from "graphql-request";
import { AI_BANNER_LOGO_FIELDS } from "./aiBannerLogoFragment";
import type { Image, Link } from "@/types/common";
import type { ImageFragmentType } from "./imageFragment";
import type { LinkFragmentType } from "./linkFragment";

export const BANNER_TITLE_DESCRIPTION_FIELDS = `
  BannerTitle
  BannerDescription
`;

export const BANNER_IMAGE_LINK_FIELDS = `
  ${BANNER_TITLE_DESCRIPTION_FIELDS}
  BannerImage {
    ...ImageFields
  }
  BannerLink {
    ...LinkFields
  }
`;

export type BannerTitleDescriptionType = {
  BannerTitle?: string;
  BannerDescription?: string;
};

// Raw inner fields inside ComponentBannerBanner
export const COMPONENT_BANNER_INNER_FIELDS = `
  ${BANNER_TITLE_DESCRIPTION_FIELDS}
  ${AI_BANNER_LOGO_FIELDS}
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
`;

// Union member selection block (... on ComponentBannerBanner)
export const COMPONENT_BANNER_FIELDS = `
  ... on ComponentBannerBanner {
    ${COMPONENT_BANNER_INNER_FIELDS}
  }
`;

// GQL named fragment for ComponentBannerBanner
export const COMPONENT_BANNER_FRAGMENT = gql`
  fragment ComponentBannerFields on ComponentBannerBanner {
    ${COMPONENT_BANNER_INNER_FIELDS}
  }
`;

// Full Banner section wrapper field selection (Banner { ... on ComponentBannerBanner })
export const COMPONENT_BANNER_SECTION_FIELDS = `
  Banner {
    ${COMPONENT_BANNER_FIELDS}
  }
`;

export type BannerLink = Link;

export type ComponentBannerItem = {
  BannerTitle?: string | null;
  BannerDescription?: string | null;
  BannerLogo?: Image | null;
  BannerImage?: Image | ImageFragmentType | null;
  isTextAlignCenter?: boolean | null;
  isVideo?: boolean | null;
  show_searchbox?: boolean | null;
  videoLink?: string | null;
  BannerLink?: Link | LinkFragmentType | null;
};

export type BannerSection = {
  Banner: ComponentBannerItem[];
};

export type HeroBannerFragmentType = ComponentBannerItem;
export type BannerItem = ComponentBannerItem;



