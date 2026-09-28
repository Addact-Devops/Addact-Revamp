import type { BlogHeroBannerItem } from "./blogHeroBannerFieldsFragment";

export const EVENT_BLOG_HERO_BANNER_FIELDS = `
  EventBanner {
    ... on ComponentBlogHeroBannerBlogHeroBanner {
      BannerTitle
      BannerDescription
      PublishDate
      BannerImage {
        ...ImageFields
      }
      eventLocation
    }
  }
`;

export type EventBlogHeroBannerItem = BlogHeroBannerItem & {
  PublishDate: string;
  eventLocation?: string;
};

export type EventBlogHeroBannerType = {
  EventBanner: EventBlogHeroBannerItem[];
};
