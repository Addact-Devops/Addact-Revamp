import { Image } from "@/types/common";
import client from "../client";
import { gql } from "graphql-request";

const GET_PRESS_RELEASE_LIST_PAGE = gql`
    query PressRelease {
        pressRelease {
            PageHeading {
                PageTitle
                Slug
            }
            HeroBanner {
                Banner {
                    ... on ComponentBannerBanner {
                        BannerDescription
                        BannerTitle
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
        }
        addactPressReleases {
            Slug
            HeroBanner {
                ... on ComponentBlogHeroBannerBlogHeroBanner {
                    BannerTitle
                    BannerImage {
                        alternativeText
                        height
                        name
                        url
                        width
                    }
                }
            }
            PressReleaseSummary
        }
    }
`;

export interface PressReleaseResponse {
    pressRelease: {
        PageHeading: {
            PageTitle: string;
            Slug: string;
        };
        HeroBanner: {
            Banner: {
                BannerDescription: string;
                BannerTitle: string;
                BannerImage: Image;
            }[];
        };
    };
    addactPressReleases: {
        Slug: string;
        HeroBanner: {
            BannerTitle: string;
            BannerImage: Image;
        }[];
        PressReleaseSummary: string;
    }[];
}

export async function getPressReleaseData(): Promise<PressReleaseResponse> {
    const data = await client.request<PressReleaseResponse>(GET_PRESS_RELEASE_LIST_PAGE);
    return data;
}
