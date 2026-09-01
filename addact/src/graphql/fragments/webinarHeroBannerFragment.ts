export const WEBINAR_HERO_BANNER_FIELDS = `
  HeroBanner {
    ... on ComponentBlogHeroBannerBlogHeroBanner {
      BannerTitle
      BannerDescription
      BannerImage {
        alternativeText
        height
        name
        url
        width
      }
      PublishDate
      ReadNow {
        id
        href
        label
        isExternal
      }
    }
  }
`;
