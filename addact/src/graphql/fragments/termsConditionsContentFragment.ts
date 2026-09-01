export const TERMS_CONDITIONS_CONTENT_FIELDS = `
  BodyContent {
    CommonTitle {
      ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
    }
  }
`;
