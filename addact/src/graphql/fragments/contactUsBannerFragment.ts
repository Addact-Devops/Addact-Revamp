export const CONTACT_US_BANNER_FIELDS = `
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
        BannerLink {
          href
          label
        }
      }
    }
  }
`;
