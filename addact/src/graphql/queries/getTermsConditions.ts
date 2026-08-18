// src/graphql/queries/getTermsConditions.ts

import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import client from "../client";

type TermsConditionsData = {
    termsConditions: {
        PageHeading: {
            PageTitle: string;
            Slug: string;
        };
        BodyContent: {
            CommonTitle: {
                Title: string;
                Description: string;
            }[];
        };
    };
};

export const getTermsConditions = async (): Promise<TermsConditionsData> => {
    const query = gql`
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
        query PageHeading {
            termsConditions {
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
    return data as TermsConditionsData;
};
