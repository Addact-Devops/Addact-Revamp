import { gql } from "graphql-request";
import client from "../client";

export type SitemapBannerType = {
    BannerTitle?: string;
    BannerDescription?: string;
    BannerImage?: {
        url?: string;
        width?: number;
        height?: number;
        alternativeText?: string | null;
    } | null;
};

export type SitemapResponse = {
    sitemap?: {
        banner?: {
            Banner?: SitemapBannerType[];
        };
    };
};

const sitemapQuery = gql`
    query Sitemap {
        sitemap {
            banner {
                Banner {
                    ... on ComponentBannerBanner {
                        BannerImage {
                            url
                            width
                            height
                            alternativeText
                        }
                        BannerTitle
                        BannerDescription
                    }
                }
            }
        }
    }
`;

export const getSitemapBanner = async (): Promise<SitemapBannerType | null> => {
    try {
        const res = await client.request<SitemapResponse>(sitemapQuery);
        return res?.sitemap?.banner?.Banner?.[0] || null;
    } catch (err) {
        console.error("Sitemap banner fetch error:", err);
        return null;
    }
};
