export const CAREERS_HERO_BANNER_FIELDS = `
  Banner {
    ... on ComponentBannerBanner {
      BannerTitle
      BannerDescription
      show_searchbox
      BannerImage {
        url
        name
        width
        height
        alternativeText
      }
    }
  }
`;
