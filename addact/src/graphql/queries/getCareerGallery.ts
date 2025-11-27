import { gql } from "graphql-request";
import client from "../client";

const endpoint = process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT;

if (!endpoint) {
    throw new Error("Missing NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT in environment variables.");
}



const query = gql`
    query CareerGalleryData {
        careers {
            Gallery {
                ... on ComponentAddactComponentGalleryTitles {
                    Title
                    SubTitle
                }
            }
        }

        galleryCategories(pagination: { limit: -1 }) {
            Name
            Images(pagination: { limit: -1 }) {
                Image {
                    url
                    alternativeText
                }
                Year
            }
        }
    }
`;

type GalleryCategory = {
    Name: string;
    Images: {
        Image: {
            url: string;
            alternativeText: string | null;
        };
        Year: number | null;
    }[];
};

type GallerySection = {
    Title?: string;
    SubTitle?: string;
};

type GalleryResponse = {
    careers: {
        Gallery?: GallerySection[];
    };
    galleryCategories: GalleryCategory[];
};

export const getCareerGalleryData = async (): Promise<GalleryResponse> => {
    const res = await client.request<GalleryResponse>(query);
    return res;
};
