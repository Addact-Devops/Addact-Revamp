import client from "../client";
import { gql } from "graphql-request";

export type WhoAreWeResponse = {
    whoAreWes: {
        Counter: {
            CounterTitle: string;
            NumberCount: number;
            id: string;
        }[];
        Title: {
            Description: string;
            Title: string;
        }[];
        pageReference: string;
    }[];
};

export const getWhoAreWe = async (): Promise<WhoAreWeResponse> => {
    const query = gql`
        query whoAreWe {
            whoAreWes {
                Counter {
                    ... on ComponentCounterCounter {
                        CounterTitle
                        NumberCount
                        id
                    }
                }
                Title {
                    ... on ComponentBaseTemplateTitleWithDescription {
                        Description
                        Title
                    }
                }
                pageReference
            }
        }
    `;

    const data = await client.request(query);
    return data as WhoAreWeResponse;
};
