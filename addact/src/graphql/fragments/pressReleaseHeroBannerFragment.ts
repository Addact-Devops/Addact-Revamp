export const PRESS_RELEASE_HERO_BANNER_FIELDS = `
  HeroBanner {
    Banner {
      ... on ComponentBannerBanner {
        ...HeroBannerFields
      }
    }
  }
`;
