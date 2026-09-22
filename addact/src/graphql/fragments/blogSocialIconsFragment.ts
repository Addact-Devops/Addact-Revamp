import { COMPONENT_LINK_IMAGE_FIELDS, type LinkImageItem } from "./linkImageFragment";

export const BLOG_SOCIAL_ICONS_FIELDS = `
  socialicons {
    SocialIcon {
      ${COMPONENT_LINK_IMAGE_FIELDS}
    }
  }
`;

export type BlogSocialIconItem = LinkImageItem;

export type BlogSocialIconsType = {
  socialicons?: {
    SocialIcon?: BlogSocialIconItem[];
  };
};


