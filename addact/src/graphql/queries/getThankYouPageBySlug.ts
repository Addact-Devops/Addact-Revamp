import { gql } from "graphql-request";
import client from "../client";

const GET_THANK_YOU_PAGE = gql`
    query ThankyouPages($filters: ThankyouPageFiltersInput) {
        thankyouPages(filters: $filters) {
            ReferenceTitle
            Slug
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
            Content {
                ... on ComponentBaseTemplateRichtext {
                    id
                    Richtext
                }
                ... on ComponentSharedLink {
                    id
                    href
                    label
                    target
                    isExternal
                }
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
            }
            AnimationVideo {
                alternativeText
                name
                url
            }
        }
    }
`;

export interface ThankYouPageResponse {
    thankyouPages: {
        ReferenceTitle: string;
        Slug: string;
        Content: Content[];
        AnimationVideo: {
            alternativeText: string;
            name: string;
            url: string;
        };
        SEO?: {
            metaTitle?: string;
            metaDescription?: string;
            ogTitle?: string;
            ogDescription?: string;
            ogImage?: { url?: string };
            metaRobots?: string;
            twitterCardTitle?: string;
            canonicalURL?: string;
            structuredData?: any;
            languageTag?: string;
        } | null;
    }[];
}

export interface Content {
    id: string;
    h1?: string;
    Richtext?: string;
    href?: string;
    label?: string;
    target?: string;
    isExternal?: boolean;
}

export async function getThankYouPageBySlug(slug: string): Promise<ThankYouPageResponse> {
    const data = await client.request<ThankYouPageResponse>(GET_THANK_YOU_PAGE, {
        filters: {
            Slug: {
                eq: `/${slug}`,
            },
        },
    });

    return data;
}
