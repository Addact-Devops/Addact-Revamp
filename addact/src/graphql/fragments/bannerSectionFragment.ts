export const BANNER_SECTION_FIELDS = `
  Banner {
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
        chipsText {
          Title
        }
      }
    }
  }
`;
