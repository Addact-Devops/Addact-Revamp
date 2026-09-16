import { AI_BANNER_LOGO_FIELDS } from "./aiBannerLogoFragment";

export const BANNER_TITLE_DESCRIPTION_FIELDS = `
  BannerTitle
  BannerDescription
`;

export type BannerTitleDescriptionType = {
  BannerTitle?: string;
  BannerDescription?: string;
};

export const COMPONENT_BANNER_FIELDS = `
  ${BANNER_TITLE_DESCRIPTION_FIELDS}
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


