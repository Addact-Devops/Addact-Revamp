import { COMPONENT_BANNER_FIELDS } from "./componentBannerFieldsFragment";
import { Image, Link } from "@/types/common";

export const DEVELOPMENT_HERO_BANNER_FIELDS = `
  Banner {
    ... on ComponentBannerBanner {
      ${COMPONENT_BANNER_FIELDS}
    }
  }
`;

// Re-using Link from @/types/common to avoid duplicate BannerLink definition
export type BannerLink = Link;

export type BannerItem = {
  BannerTitle: string;
  BannerDescription: string;
  BannerLogo: Image | null;
  BannerImage: Image | null;
  isTextAlignCenter: boolean | null;
  isVideo: boolean | null;
  show_searchbox: boolean;
  videoLink: string | null;
  BannerLink: BannerLink;
};

export type BannerSection = {
  Banner: BannerItem[];
};

export type DevelopmentHeroBannerType = {
  Banner: BannerSection;
};
