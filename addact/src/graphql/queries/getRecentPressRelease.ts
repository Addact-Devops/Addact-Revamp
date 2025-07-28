import { gql } from "graphql-request";
import client from "../client";
import { Image } from "@/types/common";

const GET_RECENT_PRESS_RELEASE = gql`
    query Recentitem($pagination: PaginationArg, $sort: [String]) {
        addactPressReleases(pagination: $pagination, sort: $sort) {
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
            Slug
        }
    }
`;

export interface RecentPressRelease {
    addactPressReleases: {
        HeroBanner: {
            BannerTitle: string;
            BannerImage: Image;
        }[];
        slug: string;
    }[];
}

export async function getRecentPressRelease(options: {
    pagination?: { limit?: number; start?: number };
    sort?: string[];
}): Promise<RecentPressRelease> {
    const variables = {
        pagination: options.pagination,
        sort: options.sort,
    };

    const data = await client.request<RecentPressRelease>(GET_RECENT_PRESS_RELEASE, variables);
    return data;
}
