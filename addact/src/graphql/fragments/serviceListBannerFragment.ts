export const SERVICE_LIST_BANNER_FIELDS = `
  Banner {
    Banner {
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
`;

