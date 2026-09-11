import { gql } from "graphql-request";
import client from "../client";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HERO_BANNER_FRAGMENT } from "../fragments/heroBannerFragment";
import { SITEMAP_BANNER_FIELDS, type SitemapBannerType, type SitemapResponse } from "../fragments/sitemapBannerFragment";

const sitemapQuery = gql`
  ${LINK_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${HERO_BANNER_FRAGMENT}
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
