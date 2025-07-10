import { gql } from "graphql-request";
import client from "../client";

type ContentChild = {
    text: string;
};

type ContentBlock = {
    type: string;
    children: ContentChild[];
};

export type WeAreAddactType = {
    Image: {
        url: string;
        alternativeText: string | null;
        height: number;
        width: number;
    };
    SubTitle: string;
    Title: string;
    Content: ContentBlock[];
    NumberContent: {
        Number: string;
        Content: string;
    }[];
};

const query = gql`
    query AboutUs {
        aboutUs {
            WeAreAddact {
                Image {
                    url
                    alternativeText
                    height
                    width
                }
                SubTitle
                Title
                Content
                NumberContent {
                    Number
                    Content
                }
            }
        }
    }
`;

export const getWeAreAddact = async (): Promise<WeAreAddactType> => {
    const res = await client.request<{ aboutUs: { WeAreAddact: WeAreAddactType } }>(query);
    return res.aboutUs.WeAreAddact;
};
