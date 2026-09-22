import {
  COMPONENT_TITLE_WITH_DESCRIPTION_FIELDS,
  type TitleWithDescriptionFragmentType,
} from "./titleWithDescriptionFragment";
import type { PageHeadingType } from "./pageHeadingFragment";

export const PRIVACY_POLICY_CONTENT_FIELDS = `
  BodyContent {
    CommonTitle {
      ${COMPONENT_TITLE_WITH_DESCRIPTION_FIELDS}
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

