import type { TitleDescriptionType } from "./titleDescriptionFragment";

export const CASE_STUDY_FORM_TITLE_FIELDS = `
  FormTitle {
    CommonTitle {
      ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
    }
  }
`;

export type CaseStudyFormTitleItem = Required<TitleDescriptionType>;

export type CaseStudyFormTitleType = {
  FormTitle: {
    CommonTitle: CaseStudyFormTitleItem[];
  };
};
