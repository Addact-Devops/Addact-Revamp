import { AI_BANNER_LOGO_FIELDS } from "./aiBannerLogoFragment";

export const AI_BANNER_SECTION_FIELDS = `
  Banner {
    Banner {
      ... on ComponentBannerBanner {
        BannerTitle
        BannerDescription
        ${AI_BANNER_LOGO_FIELDS}
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
