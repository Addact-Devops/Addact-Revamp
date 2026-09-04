export const INDUSTRY_HERO_BANNER_FIELDS = `
  HeroBanner {
    Banner {
      ... on ComponentBannerBanner {
        BannerTitle
        BannerDescription
        BannerLogo {
          ...ImageFields
        }
        BannerImage {
          ...ImageFields
        }
        isTextAlignCenter
        isVideo
        show_searchbox
        videoLink
        BannerLink {
          ...LinkFields
        }
      }
    }
  }
`;

