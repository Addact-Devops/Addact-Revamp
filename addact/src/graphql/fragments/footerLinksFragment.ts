import type { LinkFragmentType } from "./linkFragment";
import type { TitleFragmentType } from "./titleFragment";

export type FooterNavLinkItem = TitleFragmentType | LinkFragmentType;

export type FooterLinksType = {
  footerlinks?: {
    NavLink?: FooterNavLinkItem[];
  };
};

export const FOOTER_LINKS_FIELDS = `
  footerlinks {
    NavLink {
      ... on ComponentBaseTemplateTitle { ...TitleFields }
      ... on ComponentSharedLink { ...LinkFields }
    }
  }
`;


