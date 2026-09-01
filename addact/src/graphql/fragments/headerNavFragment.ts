export const HEADER_NAV_FIELDS = `
  main_navigations {
    Parent {
      HeaderNavLink {
        ... on ComponentBaseTemplateTitle { ...TitleFields }
      }
      ReferenceTitle
    }
    SubNavLink {
      ... on ComponentSharedLink {
        href
        isExternal
        id
        label
        target
        SubDisc
        Icon {
          url
          alternativeText
          height
          width
        }
      }
    }
    ReferenceTitle
    SubNavImage {
      alternativeText
      height
      name
      url
      width
    }
  }
`;
