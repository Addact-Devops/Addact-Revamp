export const PRIVACY_POLICY_CONTENT_FIELDS = `
  BodyContent {
    CommonTitle {
      ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
    }
  }
`;

export type PrivacyPolicyData = {
  privacyPolicy: {
    PageHeading: {
      PageTitle: string;
      Slug: string;
    };
    BodyContent: {
      CommonTitle: {
        Title: string;
        Description: string;
        Link?: {
          href: string;
          target?: string;
        } | null;
      }[];
    };
  };
};
