import { AI_BANNER_LOGO_FIELDS } from "./aiBannerLogoFragment";
import { BANNER_CHIPS_TEXT_FIELDS, type ChipsTextItem } from "./bannerChipsTextFragment";
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

export const BANNER_LINK_FIELDS = `
  BannerLink {
    ...LinkFields
  }
`;

export const BANNER_IMAGE_LINK_FIELDS = `
  ${BANNER_TITLE_DESCRIPTION_FIELDS}
  ${BANNER_IMAGE_FIELDS}
  ${BANNER_LINK_FIELDS}
`;

export type BannerTitleDescriptionType = {
  BannerTitle?: string | null;
  BannerDescription?: string | null;
};

// Raw inner fields inside ComponentBannerBanner
export const COMPONENT_BANNER_INNER_FIELDS = `
  ${BANNER_TITLE_DESCRIPTION_FIELDS}
  ${AI_BANNER_LOGO_FIELDS}
  ${BANNER_IMAGE_FIELDS}
  isTextAlignCenter
  isVideo
  show_searchbox
  videoLink
  ${BANNER_LINK_FIELDS}
  ${BANNER_CHIPS_TEXT_FIELDS}
`;

// Union member selection block (... on ComponentBannerBanner)
export const COMPONENT_BANNER_FIELDS = `
  ... on ComponentBannerBanner {
    ${COMPONENT_BANNER_INNER_FIELDS}
  }
`;

// Full Banner section wrapper field selection (Banner { ... on ComponentBannerBanner })
export const COMPONENT_BANNER_SECTION_FIELDS = `
  Banner {
    ${COMPONENT_BANNER_FIELDS}
  }
`;

// Nested banner wrapper field selection (banner { Banner { ... on ComponentBannerBanner } })
export const COMPONENT_NESTED_BANNER_FIELDS = `
  banner {
    ${COMPONENT_BANNER_SECTION_FIELDS}
  }
`;

// Nested uppercase banner wrapper field selection (Banner { Banner { ... on ComponentBannerBanner } })
export const COMPONENT_NESTED_UPPER_BANNER_FIELDS = `
  Banner {
    ${COMPONENT_BANNER_SECTION_FIELDS}
  }
`;

// Aliased banner wrapper field selection (Banner: banner { Banner { ... on ComponentBannerBanner } })
export const COMPONENT_ALIASED_BANNER_FIELDS = `
  Banner: banner {
    ${COMPONENT_BANNER_SECTION_FIELDS}
  }
`;

// HeroBanner wrapper selection (HeroBanner { BannerTitle BannerDescription BannerImage BannerLink })
export const COMPONENT_HERO_BANNER_IMAGE_LINK_FIELDS = `
  HeroBanner {
    ${BANNER_IMAGE_LINK_FIELDS}
  }
`;

// HeroBanner section wrapper selection (HeroBanner { Banner { ... on ComponentBannerBanner } })
export const COMPONENT_HERO_BANNER_SECTION_FIELDS = `
  HeroBanner {
    ${COMPONENT_BANNER_SECTION_FIELDS}
  }
`;

// EventBanner section wrapper selection (EventBanner { Banner { ... on ComponentBannerBanner } })
export const COMPONENT_EVENT_BANNER_SECTION_FIELDS = `
  EventBanner {
    ${COMPONENT_BANNER_SECTION_FIELDS}
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
export type { ChipsTextItem };
