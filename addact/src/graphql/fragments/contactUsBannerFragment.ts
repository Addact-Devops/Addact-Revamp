
export const CONTACT_US_BANNER_FIELDS = `
  banner {
    Banner {
      ... on ComponentBannerBanner {
        BannerImage {
          ...ImageFields
        }
        BannerTitle
        BannerDescription
        BannerLink {
          ...LinkFields
        }
      }
    }
  }
`;
