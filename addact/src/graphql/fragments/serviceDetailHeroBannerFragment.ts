export const SERVICE_DETAIL_HERO_BANNER_FIELDS = `
  HeroBanner {
    BannerTitle
    BannerDescription
    BannerImage {
      ...ImageFields
    }
    BannerLink {
      id
      href
      label
      isExternal
    }
  }
`;
