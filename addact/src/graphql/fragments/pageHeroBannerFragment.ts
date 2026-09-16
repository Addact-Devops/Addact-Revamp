import { Image, Link } from "@/types/common";

export const PAGE_HERO_BANNER_FIELDS = `
  HeroBanner {
    Banner {
      ... on ComponentBannerBanner {
        ...HeroBannerFields
      }
    }
  }
`;

export type PageHeroBannerItemType = {
  BannerTitle?: string;
  BannerDescription?: string;
  BannerImage?: Image | {
    url?: string;
    height?: number;
    width?: number;
  } | null;
  ReadNow?: Link | null;
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
