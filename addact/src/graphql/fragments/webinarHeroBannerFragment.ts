import { Image, Link } from "@/types/common";
import { BLOG_HERO_BANNER_INNER_FIELDS } from "./blogHeroBannerFragment";
import { BLOG_HERO_BANNER_READ_NOW_FIELDS } from "./blogHeroBannerReadNowFragment";

export const WEBINAR_HERO_BANNER_FIELDS = `
  HeroBanner {
    ... on ComponentBlogHeroBannerBlogHeroBanner {
      ${BLOG_HERO_BANNER_INNER_FIELDS}
      ${BLOG_HERO_BANNER_READ_NOW_FIELDS}
    }
  }
`;

export type WebinarHeroBannerItem = {
  BannerTitle: string;
  BannerDescription: string;
  BannerImage: Image;
  PublishDate: string;
  ReadNow: Link;
};

export type WebinarHeroBannerType = {
  HeroBanner: WebinarHeroBannerItem[];
};
