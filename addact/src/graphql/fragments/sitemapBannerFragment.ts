export const SITEMAP_BANNER_FIELDS = `
  banner {
    Banner {
      ... on ComponentBannerBanner {
        BannerImage {
          ...ImageFields
        }
        BannerTitle
        BannerDescription
      }
    }
  }
`;

