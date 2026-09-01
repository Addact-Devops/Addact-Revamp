// src/graphql/queries/getTermsConditions.ts

import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { PAGE_HEADING_FIELDS } from "../fragments/pageHeadingFragment";
import { TERMS_CONDITIONS_CONTENT_FIELDS } from "../fragments/termsConditionsContentFragment";
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
                ${PAGE_HEADING_FIELDS}
                ${TERMS_CONDITIONS_CONTENT_FIELDS}
            }
        }
    `;
    const data = await client.request(query);
    return data as TermsConditionsData;
};
