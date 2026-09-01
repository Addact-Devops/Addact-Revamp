export const SITEMAP_BANNER_FIELDS = `
  banner {
    Banner {
      ... on ComponentBannerBanner {
        BannerImage {
          url
          width
          height
          alternativeText
        }
        BannerTitle
        BannerDescription
      }
    }
  }
`;
