import { gql } from "graphql-request";
import client from "../client";

const GET_ALL_BLOGS = gql`
    query AddactBlogs {
        addactBlogs {
            Slug
            documentId
            HeadingSection {
                ... on ComponentBaseTemplateCommonSection {
                    PageTitle
                }
            }
            BlogBanner {
                ... on ComponentBlogHeroBannerBlogHeroBanner {
                    BannerTitle
                    BannerDescription
                    BannerImage {
                        url
                        width
                        height
                        name
                        alternativeText
                    }
                }
            }
        }
    }
`;

type AddactBlogsResponse = {
    addactBlogs: {
        Slug: string;
        documentId: string;
        HeadingSection?: {
            PageTitle?: string;
        }[];
        BlogBanner?: {
            BannerTitle?: string;
            BannerDescription?: string;
            BannerImage?: {
                url: string;
                width: number;
                height: number;
                name: string;
                alternativeText?: string;
            };
        }[];
    }[];
};

export async function getAllBlogs() {
    const data = await client.request<AddactBlogsResponse>(GET_ALL_BLOGS);
    return data.addactBlogs;
}
