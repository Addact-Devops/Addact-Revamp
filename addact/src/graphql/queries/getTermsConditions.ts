// src/graphql/queries/getTermsConditions.ts

import { gql } from "graphql-request";
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
        query PageHeading {
            termsConditions {
                PageHeading {
                    PageTitle
                    Slug
                }
                BodyContent {
                    CommonTitle {
                        ... on ComponentBaseTemplateTitleWithDescription {
                            Title
                            Description
                        }
                    }
                }
            }
        }
    `;
    const data = await client.request(query);
    return data as TermsConditionsData;
};
