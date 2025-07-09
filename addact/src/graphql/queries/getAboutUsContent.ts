import { gql } from "graphql-request";
import client from "../client";

type ParagraphBlock = {
    type: "paragraph";
    children: {
        type: string;
        text: string;
    }[];
};

export type AboutUsContentData = {
    aboutUs: {
        AboutUsContent: {
            SubTitle: string;
            Title: string;
            Content: ParagraphBlock[];
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
