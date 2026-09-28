import { COMPONENT_LINK_IMAGE_FIELDS, type LinkImageItem } from "./linkImageFragment";

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
      ${COMPONENT_LINK_IMAGE_FIELDS}
    }
  }
`;


