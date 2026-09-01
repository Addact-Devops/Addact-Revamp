export const SERVICES_DETAIL_BANNER_FIELDS = `
  Banner: banner {
    Banner {
      ... on ComponentBannerBanner {
        BannerTitle
        BannerDescription
        BannerLogo {
          alternativeText
          height
          url
          width
        }
        BannerImage {
          alternativeText
          height
          url
          width
        }
        isTextAlignCenter
        isVideo
        show_searchbox
        videoLink
        BannerLink {
          id
          href
          label
          target
          isExternal
          SubDisc
          Icon {
            alternativeText
            height
            url
            width
          }
        }
      }
    }
  }
`;
