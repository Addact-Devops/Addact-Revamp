// src/graphql/queries/getPrivacyPolicy.ts

import { gql } from "graphql-request";
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
        query PageHeading {
            privacyPolicy {
                PageHeading {
                    PageTitle
                    Slug
                }
                BodyContent {
                    CommonTitle {
                        ... on ComponentBaseTemplateTitleWithDescription {
                            Title
                            Description
                            Link {
                                href
                                target
                            }
                        }
                    }
                }
            }
        }
    `;

    const data = await client.request(query);
    return data as PrivacyPolicyData;
};
