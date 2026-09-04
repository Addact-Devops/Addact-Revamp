import { HEADER_NAV_PARENT_FIELDS } from "./headerNavParentFragment";

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
