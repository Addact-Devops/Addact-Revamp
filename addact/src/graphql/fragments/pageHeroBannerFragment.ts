import { COMPONENT_HERO_BANNER_FIELDS, type HeroBannerFragmentType } from "./heroBannerFragment";
import type { HeaderLink } from "./linkFragment";

export const PAGE_HERO_BANNER_FIELDS = `
  HeroBanner {
    Banner {
      ${COMPONENT_HERO_BANNER_FIELDS}
    }
  }
`;

export type PageHeroBannerItemType = HeroBannerFragmentType & {
  ReadNow?: HeaderLink | null;
};

export type PageHeroBannerType = {
  HeroBanner: {
    Banner: PageHeroBannerItemType[];
  };
};

export type AboutUsBannerType = PageHeroBannerItemType;

export type AboutUsHeroBannerResponse = {
  aboutUs?: PageHeroBannerType;
};
