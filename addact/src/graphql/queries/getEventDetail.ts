import { gql } from "graphql-request";
import client from "../client";
import { Heading, Image } from "@/types/common";

const GET_EVENT_DETAIL_PAGE = gql`
    query AddactsEvents($filters: AddactEventsFiltersInput) {
        addactsEvents(filters: $filters) {
            EventBanner {
                ... on ComponentBlogHeroBannerBlogHeroBanner {
                    BannerDescription
                    BannerImage {
                        alternativeText
                        height
                        name
                        url
                        width
                    }
                    BannerTitle
                    PublishDate
                    eventLocation
                }
            }
            EventContent {
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
                    isExternal
                }
            }
            HeadingSection {
                ... on ComponentBaseTemplateCommonSection {
                    PageTitle
                }
            }
            contact_us_card {
                ButtonLabel
                CompanyName
                EmailLabel
                NameLable
                RequirementsLabel
                RecipientEmails
            social_icons {
                SocialIcon {
                    ... on ComponentBaseTemplateLinkImage {
                        Title
                        Links {
                            href
                            id
                            isExternal
                            label
                        }
                        Icons {
                            alternativeText
                            height
                            name
                            url
                            width
                        }
                        HoverIcon {
                            alternativeText
                            height
                            name
                            url
                            width
                        }
                    }
                }
            }
        }
    }
`;

export interface EventDetailResponse {
    addactsEvents: {
        EventBanner: {
            BannerDescription: string;
            BannerImage: Image;
            BannerTitle: string;
            PublishDate: string;
            eventLocation: string;
        }[];
        EventContent: Heading[];
        HeadingSection: {
            PageTitle: string;
        }[];
        contact_us_card: {
            ButtonLabel: string;
            CompanyName: string;
            EmailLabel: string;
            NameLable: string;
            RequirementsLabel: string;
            RecipientEmails: string;
            PhoneLabel: string;
            Form: {
                Title: string;
                Description: string;
            }[];
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
            structuredData?: Record<string, unknown>;
            languageTag?: string;
        } | null;
    }[];
}

export async function getEventDetailBySlug(slug: string): Promise<EventDetailResponse> {
    const data = await client.request<EventDetailResponse>(GET_EVENT_DETAIL_PAGE, {
        filters: {
            Slug: {
                eq: `/${slug}`,
            },
        },
    });
    return data;
}
