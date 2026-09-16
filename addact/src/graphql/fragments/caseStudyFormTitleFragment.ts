export const CASE_STUDY_FORM_TITLE_FIELDS = `
  FormTitle {
    CommonTitle {
      ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
    }
  }
`;

export type CaseStudyFormTitleItem = {
  Title: string;
  Description: string;
};

export type CaseStudyFormTitleType = {
  FormTitle: {
    CommonTitle: CaseStudyFormTitleItem[];
  };
};
