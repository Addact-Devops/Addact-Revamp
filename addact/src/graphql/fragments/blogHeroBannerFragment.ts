export const BLOG_HERO_BANNER_INNER_FIELDS = `
      BannerTitle
      BannerDescription
      PublishDate
      BannerImage {
          ...ImageFields
        }
`;

export const BLOG_HERO_BANNER_FIELDS = `
  HeroBanner {
    ... on ComponentBlogHeroBannerBlogHeroBanner {
      ${BLOG_HERO_BANNER_INNER_FIELDS}
    }
  }
`;
