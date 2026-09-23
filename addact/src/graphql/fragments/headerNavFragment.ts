import { HEADER_NAV_PARENT_FIELDS, type HeaderNavParentItem } from "./headerNavParentFragment";
import type { ImageFragmentType } from "./imageFragment";
import type { LinkFragmentType } from "./linkFragment";

export type HeaderNavItem = {
  Parent?: HeaderNavParentItem;
  SubNavLink: LinkFragmentType[];
  ReferenceTitle: string;
  SubNavImage: ImageFragmentType;
};

export type HeaderNavType = {
  main_navigations?: HeaderNavItem[];
};

export const HEADER_NAV_FIELDS = `
  main_navigations {
    ${HEADER_NAV_PARENT_FIELDS}
    SubNavLink {
          ...LinkFields
        }
    ReferenceTitle
    SubNavImage {
          ...ImageFields
        }
  }
`;

