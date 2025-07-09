// src/graphql/queries/getAboutUsQuote.ts
import { gql } from "graphql-request";
import client from "../client"; // Adjust if your client path is different

export type QuoteData = {
    aboutUs: {
        Quote: {
            AuthorName: string;
            AuthorMessage: string;
            AuthorImage: {
                url: string;
                alternativeText: string | null;
            };
        };
    };
};

export const getAboutUsQuote = async (): Promise<QuoteData> => {
    const query = gql`
        query AboutUs {
            aboutUs {
                Quote {
                    AuthorImage {
                        alternativeText
                        url
                    }
                    AuthorMessage
                    AuthorName
                }
            }
        }
    `;

    const data = await client.request(query);
    return data as QuoteData;
};
