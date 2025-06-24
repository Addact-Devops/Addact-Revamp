// graphql/queries/getOurPartners.ts
import client from "../client";
import { gql } from "graphql-request";

export type PartnerImage = {
    Image: {
        url: string;
        alternativeText: string | null;
    };
};

export type PartnerTitle = { h1: string } | { h2: string } | { h3: string } | { h5: string } | { h6: string };

export type OurPartnerResponse = {
    home: {
        ourpartner: {
            Title: PartnerTitle[];
            Image: PartnerImage[];
        };
    };
};

export const getOurPartners = async (): Promise<OurPartnerResponse> => {
    const query = gql`
        query Home {
            home {
                ourpartner {
                    Title {
                        ... on ComponentHeadingsH1 {
                            id
                            h1
                        }
                        ... on ComponentHeadingsH2 {
                            id
                            h2
                        }
                        ... on ComponentHeadingsH3 {
                            id
                            h3
                        }
                        ... on ComponentHeadingsH4 {
                            id
                            h5
                        }
                        ... on ComponentHeadingsH5 {
                            id
                            h5
                        }
                        ... on ComponentHeadingsH6 {
                            id
                            h6
                        }
                    }
                    Image {
                        ... on ComponentSharedImage {
                            Image {
                                url
                                alternativeText
                            }
                        }
                    }
                }
            }
        }
    `;

    const data = await client.request(query);
    return data as OurPartnerResponse;
};
