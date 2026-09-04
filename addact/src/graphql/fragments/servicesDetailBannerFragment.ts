export const SERVICES_DETAIL_BANNER_FIELDS = `
  Banner: banner {
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
