export const PROJECT_COST_BANNER_FIELDS = `
  banner {
    Banner {
      ... on ComponentBannerBanner {
        BannerImage {
          ...ImageFields
        }
        BannerTitle
        BannerDescription
        BannerLogo {
          ...ImageFields
        }
      }
    }
  }
`;

