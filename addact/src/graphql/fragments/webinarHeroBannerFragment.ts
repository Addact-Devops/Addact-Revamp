export const WEBINAR_HERO_BANNER_FIELDS = `
  HeroBanner {
    ... on ComponentBlogHeroBannerBlogHeroBanner {
      BannerTitle
      BannerDescription
      BannerImage {
        ...ImageFields
      }
      PublishDate
      ReadNow {
        ...LinkFields
      }
    }
  }
`;
