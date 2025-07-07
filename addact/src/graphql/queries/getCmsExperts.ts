import { gql } from "graphql-request";
import client from "../client";

const GET_CMS_EXPERTISE = gql`
    query ourExpertises {
        ourExpertises {
            CMS {
                ... on ComponentBaseTemplateLinkImage {
                    Icons {
                        alternativeText
                        height
                        name
                        url
                        width
                    }
                    Links {
                        id
                        href
                        label
                        target
                        isExternal
                    }
                    Title
                    id
                }
            }
            ExpertiseTitle {
                ... on ComponentBaseTemplateTitleWithDescription {
                    Description
                    Title
                }
            }
        }
    }
`;

export interface OurExpertise {
    CMS: {
        Icons: {
            alternativeText: string;
            height: number;
            name: string;
            url: string;
            width: number;
        };
        Links: {
            id: string;
            href: string;
            label: string;
            target: string;
            isExternal: boolean;
        };
        Title: string;
        id: string;
    }[];
    ExpertiseTitle: {
        Description: string;
        Title: string;
    }[];
}

export interface CMSResponse {
    ourExpertises: OurExpertise[];
}

export interface HomeProps {
    data: CMSResponse;
}

export async function getCMSExpertiseData(): Promise<CMSResponse> {
    const data = await client.request<CMSResponse>(GET_CMS_EXPERTISE);
    return data;
}
