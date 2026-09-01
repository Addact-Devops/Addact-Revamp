export const VIDEO_BANNER_FIELDS = `
  banner {
    Banner {
      ... on ComponentBannerBanner {
        ...HeroBannerFields
      }
    }
  }
`;
