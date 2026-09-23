import { type Image } from "@/types/common";

export const AI_BANNER_LOGO_FIELDS = `
  BannerLogo {
    ...ImageFields
  }
`;

export type BannerLogo = {
  BannerLogo: Image | null;
};

