import client from "../client";
import { gql } from "graphql-request";

// Types
export type BrandValueType = {
    Title: string;
    SubTitle: string;
    Content: {
        type: string;
        children: { text: string }[];
    }[];
    Image: {
        url: string;
        alternativeText: string | null;
        width: number | null;
        height: number | null;
    };
};

type BrandValueQueryResponse = {
    aboutUs: {
        BrandValue: BrandValueType;
    };
};

// Query
const query = gql`
    query AboutUs {
        aboutUs {
            BrandValue {
                Title
                SubTitle
                Content
                Image {
                    url
                    alternativeText
                    width
                    height
                }
            }
        }
    }
`;

export const getBrandValue = async (): Promise<BrandValueType> => {
    const res = await client.request<BrandValueQueryResponse>(query);
    return res.aboutUs.BrandValue;
};
