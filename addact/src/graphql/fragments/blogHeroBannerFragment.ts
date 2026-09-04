
export const BLOG_HERO_BANNER_FIELDS = `
  HeroBanner {
    ... on ComponentBlogHeroBannerBlogHeroBanner {
      BannerTitle
      BannerDescription
      PublishDate
      BannerImage {
          ...ImageFields
        }
    }
  }
`;
