import { type LinkImageItem } from "./linkImageFragment";

export type SocialIcon = LinkImageItem;

export type SocialIconItem = {
  SocialIcon?: SocialIcon[];
};

export type SocialIconsType = {
  social_icons?: SocialIconItem[];
};

export type { LinkImageItem };

export const SOCIAL_ICONS_FIELDS = `
  social_icons {
    SocialIcon {
      ... on ComponentBaseTemplateLinkImage { ...LinkImageFields }
    }
  }
`;


