import { gql } from "graphql-request";
import client from "../client";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HERO_BANNER_FRAGMENT, BANNER_HERO_SECTION_FIELDS, type HeroBannerFragmentType } from "../fragments/heroBannerFragment";

export type SitemapBannerType = HeroBannerFragmentType;

export type SitemapResponse = {
  sitemap?: {
    banner?: {
      Banner?: SitemapBannerType[];
    };
  };
};

const sitemapQuery = gql`
  ${LINK_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${HERO_BANNER_FRAGMENT}
  query Sitemap {
    sitemap {
      ${BANNER_HERO_SECTION_FIELDS}
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
