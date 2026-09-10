import { Image } from "@/types/common";

export const PRESS_RELEASE_HERO_BANNER_FIELDS = `
  HeroBanner {
    Banner {
      ... on ComponentBannerBanner {
        ...HeroBannerFields
      }
    }
  }
`;

export type PressReleaseHeroBannerType = {
  HeroBanner: {
    Banner: {
      BannerDescription: string;
      BannerTitle: string;
      BannerImage: Image;
    }[];
  };
};
