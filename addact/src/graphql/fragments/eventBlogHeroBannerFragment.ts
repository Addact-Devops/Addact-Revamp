
export const EVENT_BLOG_HERO_BANNER_FIELDS = `
  EventBanner {
    ... on ComponentBlogHeroBannerBlogHeroBanner {
      BannerTitle
      BannerDescription
      PublishDate
      eventLocation
      BannerImage {
          ...ImageFields
        }
    }
  }
`;
