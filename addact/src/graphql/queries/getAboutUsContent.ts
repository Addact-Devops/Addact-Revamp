import { gql } from "graphql-request";
import client from "../client";

export type AboutUsContentData = {
    aboutUs: {
        AboutUsContent: {
            SubTitle: string;
            Title: string;
            Content: any;
            Image: {
                url: string;
                alternativeText?: string | null;
            };
        };
    };
};

export const getAboutUsContent = async (): Promise<AboutUsContentData> => {
    const query = gql`
        query AboutUs {
            aboutUs {
                AboutUsContent {
                    SubTitle
                    Title
                    Content
                    Image {
                        url
                        alternativeText
                    }
                }
            }
        }
    `;

    const data = await client.request(query);
    return data as AboutUsContentData;
};
