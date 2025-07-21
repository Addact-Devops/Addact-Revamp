import { gql, GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT;

if (!endpoint) {
    throw new Error("Missing NEXT_PUBLIC_STRAPI_GRAPHQL_ENDPOINT in environment variables.");
}

const client = new GraphQLClient(endpoint);

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

        galleryCategories {
            Name
            Images {
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
