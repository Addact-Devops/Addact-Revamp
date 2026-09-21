import type { TitleWithDescriptionFragmentType } from "./titleWithDescriptionFragment";
import type { PageHeadingType } from "./pageHeadingFragment";

export const PRIVACY_POLICY_CONTENT_FIELDS = `
  BodyContent {
    CommonTitle {
      ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
    }
  }
`;

export type PrivacyPolicyData = {
  privacyPolicy: {
    PageHeading: PageHeadingType["PageHeading"];
    BodyContent: {
      CommonTitle: TitleWithDescriptionFragmentType[];
    };
  };
};

