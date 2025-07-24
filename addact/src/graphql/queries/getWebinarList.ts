import { gql } from "graphql-request";
import client from "../client";
import { Image } from "@/types/common";

const GET_WEBINAR_LIST_PAGE = gql`
    query WebinarList {
        webinar {
            HeroBanner {
                Banner {
                    ... on ComponentBannerBanner {
                        BannerTitle
                        BannerDescription
                        BannerImage {
                            alternativeText
                            height
                            name
                            url
                            width
                        }
                    }
                }
            }
            PageHeading {
                PageTitle
                Slug
            }
        }
        addactWebinars {
            Slug
            ReferenceTitle
            HeroBanner {
                ... on ComponentBlogHeroBannerBlogHeroBanner {
                    BannerTitle
                    BannerDescription
                    BannerImage {
                        alternativeText
                        height
                        name
                        url
                        width
                    }
                    PublishDate
                }
            }
            WebinarSummary
        }
    }
`;

export interface WebinarListResponse {
    webinar: {
        HeroBanner: {
            Banner: {
                BannerTitle: string;
                BannerDescription: string;
                BannerImage: Image;
            }[];
        };
        PageHeading: {
            PageTitle: string;
            Slug: string;
        };
    };
    addactWebinars: {
        Slug: string;
        ReferenceTitle: string;
        HeroBanner: {
            BannerTitle: string;
            BannerDescription: string;
            BannerImage: Image;
            PublishDate: string;
        }[];
        WebinarSummary: string;
    }[];
}

export async function getWebinarListData(): Promise<WebinarListResponse> {
    const data = await client.request<WebinarListResponse>(GET_WEBINAR_LIST_PAGE);
    return data;
}
