export const EVENT_BANNER_FIELDS = `
  EventBanner {
    Banner {
      ... on ComponentBannerBanner {
        BannerDescription
        BannerImage {
          alternativeText
          height
          name
          url
          width
        }
        BannerLink {
          id
          href
          label
          isExternal
        }
        BannerTitle
      }
    }
  }
`;
