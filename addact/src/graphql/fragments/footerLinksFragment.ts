export const FOOTER_LINKS_FIELDS = `
  footerlinks {
    NavLink {
      ... on ComponentBaseTemplateTitle { ...TitleFields }
      ... on ComponentSharedLink {
        id
        href
        label
        target
        isExternal
      }
    }
  }
`;
