// src/graphql/queries/getPrivacyPolicy.ts

import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import client from "../client";

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

export const getPrivacyPolicy = async (): Promise<PrivacyPolicyData> => {
  const query = gql`
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
    query PageHeading {
      privacyPolicy {
        PageHeading {
          PageTitle
          Slug
        }
        BodyContent {
          CommonTitle {
            ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
          }
        }
      }
    }
  `;

  const data = await client.request(query);
  return data as PrivacyPolicyData;
};
