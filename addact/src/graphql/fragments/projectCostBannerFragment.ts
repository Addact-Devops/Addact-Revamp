export const PROJECT_COST_BANNER_FIELDS = `
  banner {
    Banner {
      ... on ComponentBannerBanner {
        BannerImage {
          url
          alternativeText
          width
          height
        }
        BannerTitle
        BannerDescription
        BannerLogo {
          url
          alternativeText
          width
          height
        }
      }
    }
  }
`;
