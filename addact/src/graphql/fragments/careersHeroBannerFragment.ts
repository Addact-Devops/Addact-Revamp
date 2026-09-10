import { COMPONENT_BANNER_FIELDS } from "./componentBannerFieldsFragment";
import { Image } from "@/types/common";

export const CAREERS_HERO_BANNER_FIELDS = `
  Banner {
    ... on ComponentBannerBanner {
      ${COMPONENT_BANNER_FIELDS}
    }
  }
`;

export type CareersHeroBannerItem = {
  BannerTitle?: string;
  BannerDescription?: string;
  show_searchbox?: boolean;
  BannerImage: Image;
};

export type CareersHeroBanner = {
  Banner?: CareersHeroBannerItem[];
};

export type CareersHeroBannerType = {
  Banner: CareersHeroBanner;
};
