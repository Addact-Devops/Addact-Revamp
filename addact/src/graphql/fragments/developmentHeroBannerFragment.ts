import { AI_BANNER_LOGO_FIELDS } from "./aiBannerLogoFragment";

export const DEVELOPMENT_HERO_BANNER_FIELDS = `
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
`;
