import { AI_BANNER_LOGO_FIELDS } from "./aiBannerLogoFragment";

export const COMPONENT_BANNER_FIELDS = `
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
`;
