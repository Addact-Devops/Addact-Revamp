import type { HeaderLink } from "./linkFragment";
import type { ImageFragmentType } from "./imageFragment";

export const BLOG_SOCIAL_ICONS_FIELDS = `
  socialicons {
    SocialIcon {
      ... on ComponentBaseTemplateLinkImage { ...LinkImageFields }
    }
  }
`;

export type BlogSocialIconItem = {
  Title?: string;
  ClassName?: string;
  Links?: HeaderLink[];
  Icons?: Partial<ImageFragmentType>;
  HoverIcon?: Partial<ImageFragmentType>;
};

export type BlogSocialIconsType = {
  socialicons?: {
    SocialIcon?: BlogSocialIconItem[];
  };
};

