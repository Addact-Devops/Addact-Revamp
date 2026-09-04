import { gql } from "graphql-request";
import client from "../client";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { SITEMAP_BANNER_FIELDS } from "../fragments/sitemapBannerFragment";

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
  ${IMAGE_FRAGMENT}
  query Sitemap {
    sitemap {
      ${SITEMAP_BANNER_FIELDS}
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
