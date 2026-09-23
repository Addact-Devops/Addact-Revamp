import { PageHeadingType } from "./pageHeadingFragment";
import { COMPONENT_TITLE_WITH_DESCRIPTION_FIELDS } from "./titleWithDescriptionFragment";
import type { TitleDescriptionType } from "./titleDescriptionFragment";

export const TERMS_CONDITIONS_CONTENT_FIELDS = `
  BodyContent {
    CommonTitle {
      ${COMPONENT_TITLE_WITH_DESCRIPTION_FIELDS}
    }
  }
`;

export type TermsConditionsCommonTitle = Required<TitleDescriptionType>;

export type TermsConditionsData = {
  termsConditions: {
    PageHeading: PageHeadingType["PageHeading"];
    BodyContent: {
      CommonTitle: TermsConditionsCommonTitle[];
    };
  };
};

