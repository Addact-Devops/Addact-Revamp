import { BLOG_HERO_BANNER_INNER_FIELDS } from "./blogHeroBannerFragment";

export const EVENT_BLOG_HERO_BANNER_FIELDS = `
  EventBanner {
    ... on ComponentBlogHeroBannerBlogHeroBanner {
      ${BLOG_HERO_BANNER_INNER_FIELDS}
      eventLocation
    }
  }
`;
