import { HERO_BANNER_FULL_FIELDS, type BlogBannerItem } from "./blogHeroBannerFieldsFragment";

export const WEBINAR_HERO_BANNER_FIELDS = `
  ${HERO_BANNER_FULL_FIELDS}
`;

export type WebinarHeroBannerItem = BlogBannerItem & {
  BannerTitle: string;
  PublishDate: string;
};

export type WebinarHeroBannerType = {
  HeroBanner: WebinarHeroBannerItem[];
};

