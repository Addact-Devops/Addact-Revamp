
export const EVENT_BANNER_FIELDS = `
  EventBanner {
    Banner {
      ... on ComponentBannerBanner {
        BannerDescription
        BannerImage {
          ...ImageFields
        }
        BannerLink {
          ...LinkFields
        }
        BannerTitle
      }
    }
  }
`;
