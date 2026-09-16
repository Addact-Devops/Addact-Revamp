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
  Links?: {
    id?: string;
    href?: string;
    label?: string;
    target?: string;
    isExternal?: boolean;
  }[];
  Icons?: {
    alternativeText?: string;
    name?: string;
    height?: number;
    url?: string;
    width?: number;
  };
  HoverIcon?: {
    alternativeText?: string;
    name?: string;
    height?: number;
    url?: string;
    width?: number;
  };
};

export type BlogSocialIconsType = {
  socialicons?: {
    SocialIcon?: BlogSocialIconItem[];
  };
};

