import { gql } from "graphql-request";
import client from "../client";
import { Heading, Image } from "@/types/common";

const GET_WEBINAR_DETAIL_PAGE = gql`
    query AddactWebinars($filters: AddactWebinarFiltersInput) {
        addactWebinars(filters: $filters) {
            SEO {
                metaTitle
                metaDescription
                ogTitle
                ogDescription
                ogImage {
                    url
                }
                metaRobots
                twitterCardTitle
                canonicalURL
                structuredData
                languageTag
            }
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
                    ReadNow {
                        id
                        href
                        label
                        isExternal
                    }
                }
            }
            WebinarContent {
                ... on ComponentHeadingsH1 {
                    id
                    h1
                }
                ... on ComponentHeadingsH2 {
                    id
                    h2
                }
                ... on ComponentHeadingsH3 {
                    id
                    h3
                }
                ... on ComponentHeadingsH4 {
                    id
                    h5
                }
                ... on ComponentHeadingsH5 {
                    id
                    h5
                }
                ... on ComponentHeadingsH6 {
                    id
                    h6
                }
                ... on ComponentBaseTemplateRichtext {
                    id
                    Richtext
                }
                ... on ComponentSharedImage {
                    id
                    Image {
                        alternativeText
                        height
                        name
                        url
                        width
                    }
                }
                ... on ComponentSharedLink {
                    id
                    href
                    label
                    target
                    isExternal
                }
            }
            Speakers {
                Author {
                    AuthorImage {
                        alternativeText
                        height
                        name
                        url
                        width
                    }
                    AuthorName
                    designation {
                        DesignationTitle
                    }
                }
            }
            Host {
                Author {
                    AuthorImage {
                        alternativeText
                        height
                        name
                        url
                        width
                    }
                    AuthorName
                    designation {
                        DesignationTitle
                    }
                }
            }
        }
    }
`;

export interface WebinarDetailResponse {
    addactWebinars: {
        SEO?: {
            metaTitle?: string;
            metaDescription?: string;
            ogTitle?: string;
            ogDescription?: string;
            ogImage?: { url: string };
            metaRobots?: string;
            twitterCardTitle?: string;
            canonicalURL?: string;
            structuredData?: string;
            languageTag?: string;
        };
        HeroBanner: {
            BannerTitle: string;
            BannerDescription: string;
            BannerImage: Image;
            PublishDate: string;
            ReadNow: {
                id: string;
                href: string;
                label: string;
                isExternal: boolean;
            };
        }[];
        WebinarContent: Heading[];
        Speakers: {
            Author: {
                AuthorImage: Image;
                AuthorName: string;
                designation: {
                    DesignationTitle: string;
                };
            };
        }[];
        Host: {
            Author: {
                AuthorImage: Image;
                AuthorName: string;
                designation: {
                    DesignationTitle: string;
                };
            };
        }[];
    }[];
}

export async function getWebinarDetailBySlug(slug: string): Promise<WebinarDetailResponse> {
    const data = await client.request<WebinarDetailResponse>(GET_WEBINAR_DETAIL_PAGE, {
        filters: {
            Slug: {
                eq: `/${slug}`,
            },
        },
    });
    return data;
}
