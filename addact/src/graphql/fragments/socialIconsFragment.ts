import { Image, Link } from "@/types/common";
import type { LinkImageItem } from "./linkImageFragment";

export type SocialIcon = {
  Title: string;
  Links: Link;
  Icons: Image;
  HoverIcon: Image;
};

export type SocialIconItem = {
  SocialIcon?: LinkImageItem[] | SocialIcon[];
};

export type SocialIconsType = {
  social_icons?: SocialIconItem | SocialIconItem[];
};

export const SOCIAL_ICONS_FIELDS = `
  social_icons {
    SocialIcon {
      ... on ComponentBaseTemplateLinkImage { ...LinkImageFields }
    }
  }
`;

