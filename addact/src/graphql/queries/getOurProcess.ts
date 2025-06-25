import client from "../client";
import { gql } from "graphql-request";

type Heading = { h1: string } | { h2: string } | { h3: string } | { h5: string } | { h6: string };

type ProcessItem = {
    id: string;
    Title: string;
    Description: string;
};

export type OurProcessData = {
    home: {
        ourprocess: {
            Title: Heading[];
            ProcessData: ProcessItem[];
        };
    };
};

export const getOurProcess = async (): Promise<OurProcessData> => {
    const query = gql`
        query Home {
            home {
                ourprocess {
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
                    ProcessData {
                        ... on ComponentBaseTemplateTitleWithDescription {
                            id
                            Title
                            Description
                        }
                    }
                }
            }
        }
    `;

    const data = await client.request<OurProcessData>(query); // ✅ type assertion here
    return data;
};
