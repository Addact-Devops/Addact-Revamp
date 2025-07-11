// src/graphql/queries/getBannerById.ts

import { gql } from "graphql-request";
import client from "../client";

export type BannerType = {
    id: string;
    BannerTitle: string | null;
    BannerDescription: string | null;
    BannerImage: {
        url: string;
        height: number;
        width: number;
        alternativeText: string | null;
    } | null;
    BannerLink: {
        href: string;
    } | null;
    show_searchbox: boolean | null;
};

type BannersResponse = {
    banners: {
        Banner: BannerType[];
    }[];
};

const query = gql`
    query Banners {
        banners {
            Banner {
                ... on ComponentBannerBanner {
                    id
                    BannerTitle
                    BannerDescription
                    BannerImage {
                        url
                        height
                        width
                        alternativeText
                    }
                    BannerLink {
                        href
                    }
                    show_searchbox
                }
            }
        }
    }
`;

export const getBannerById = async (id: string): Promise<BannerType | null> => {
    try {
        const res = await client.request<BannersResponse>(query);
        const banners = res?.banners?.flatMap((b) => b?.Banner || []) || [];
        return banners.find((banner) => banner.id === id) || null;
    } catch (error) {
        console.error("Error fetching banner by ID:", error);
        return null;
    }
};
