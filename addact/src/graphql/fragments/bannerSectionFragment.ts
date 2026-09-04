import { AI_BANNER_LOGO_FIELDS } from "./aiBannerLogoFragment";
import { BANNER_CHIPS_TEXT_FIELDS } from "./bannerChipsTextFragment";

export const BANNER_SECTION_FIELDS = `
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
        ${BANNER_CHIPS_TEXT_FIELDS}
      }
    }
  }
`;
