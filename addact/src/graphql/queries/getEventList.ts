import { gql } from "graphql-request";
import client from "../client";
import { Image, Link } from "@/types/common";

const GET_EVENT_LIST_PAGE = gql`
    query EventList {
        event {
            EventBanner {
                Banner {
                    ... on ComponentBannerBanner {
                        BannerDescription
                        BannerImage {
                            alternativeText
                            height
                            name
                            url
                            width
                        }
                        BannerLink {
                            id
                            href
                            label
                            isExternal
                        }
                        BannerTitle
                    }
                }
            }
            PageHeading {
                PageTitle
                Slug
            }
        }
        addactsEvents {
            EventBanner {
                ... on ComponentBlogHeroBannerBlogHeroBanner {
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
            EventSummary
            Slug
        }
    }
`;

export interface EventListResponse {
    event: {
        EventBanner: {
            Banner: {
                BannerDescription: string;
                BannerImage: Image;
                BannerLink: Link;
                BannerTitle: string;
            }[];
        };
        PageHeading: {
            PageTitle: string;
            Slug: string;
        }[];
    };
    addactsEvents: {
        EventBanner: {
            BannerImage: Image;
            BannerTitle: string;
            PublishDate: string;
            eventLocation: string;
        }[];
        EventSummary: string;
        Slug: string;
    }[];
}

export async function getEventListPageData(): Promise<EventListResponse> {
    const data = await client.request<EventListResponse>(GET_EVENT_LIST_PAGE);
    return data;
}
