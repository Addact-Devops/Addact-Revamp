export const CASE_STUDY_FORM_TITLE_FIELDS = `
  FormTitle {
    CommonTitle {
      ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
    }
  }
`;
