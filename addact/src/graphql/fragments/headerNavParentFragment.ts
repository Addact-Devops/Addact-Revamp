import { COMPONENT_TITLE_FIELDS, type TitleFragmentType } from "./titleFragment";

export type HeaderNavParentItem = {
  HeaderNavLink?: TitleFragmentType[];
  ReferenceTitle?: string;
};

export type HeaderNavParentType = {
  Parent?: HeaderNavParentItem;
};

export const HEADER_NAV_PARENT_FIELDS = `
  Parent {
    HeaderNavLink {
      ${COMPONENT_TITLE_FIELDS}
    }
    ReferenceTitle
  }
`;

