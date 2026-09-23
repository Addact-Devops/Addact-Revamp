import { COMPONENT_LINK_FIELDS, type LinkFragmentType } from "./linkFragment";
import { COMPONENT_TITLE_FIELDS, type TitleFragmentType } from "./titleFragment";

export type FooterNavLinkItem = TitleFragmentType | LinkFragmentType;

export type FooterLinksType = {
  footerlinks?: {
    NavLink?: FooterNavLinkItem[];
  };
};

export const FOOTER_LINKS_FIELDS = `
  footerlinks {
    NavLink {
      ${COMPONENT_TITLE_FIELDS}
      ${COMPONENT_LINK_FIELDS}
    }
  }
`;


