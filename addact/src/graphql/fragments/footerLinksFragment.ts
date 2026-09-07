export const FOOTER_LINKS_FIELDS = `
  footerlinks {
    NavLink {
      ... on ComponentBaseTemplateTitle { ...TitleFields }
      ... on ComponentSharedLink { ...LinkFields }
    }
  }
`;

