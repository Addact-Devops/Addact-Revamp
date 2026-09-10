import { BLOG_HERO_BANNER_INNER_FIELDS, type BlogHeroBannerItem } from "./blogHeroBannerFragment";

export const EVENT_BLOG_HERO_BANNER_FIELDS = `
  EventBanner {
    ... on ComponentBlogHeroBannerBlogHeroBanner {
      ${BLOG_HERO_BANNER_INNER_FIELDS}
      eventLocation
    }
  }
`;

export type EventBlogHeroBannerItem = BlogHeroBannerItem & {
  BannerDescription: string;
  PublishDate: string;
  eventLocation: string;
};

export type EventBlogHeroBannerType = {
  EventBanner: EventBlogHeroBannerItem[];
};
