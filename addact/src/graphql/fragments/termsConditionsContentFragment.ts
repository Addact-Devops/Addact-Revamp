import { PageHeadingType } from "./pageHeadingFragment";

export const TERMS_CONDITIONS_CONTENT_FIELDS = `
  BodyContent {
    CommonTitle {
      ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
    }
  }
`;

export type TermsConditionsData = {
  termsConditions: {
    PageHeading: PageHeadingType["PageHeading"];
    BodyContent: {
      CommonTitle: {
        Title: string;
        Description: string;
      }[];
    };
  };
};
