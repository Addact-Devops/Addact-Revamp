import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import { LINK_IMAGE_FRAGMENT } from "../fragments/linkImageFragment";
import { SEO_FIELDS } from "../fragments/seoFragment";
import { BLOG_HERO_BANNER_FIELDS } from "../fragments/blogHeroBannerFragment";
import { PRESS_CONTENT_FIELDS } from "../fragments/pressContentFragment";
import { SOCIAL_ICONS_FIELDS } from "../fragments/socialIconsFragment";
import client from "../client";
import { Heading, Image, Link } from "@/types/common";

const GET_PRESS_RELEASE_DETAIL_PAGE = gql`
  ${LINK_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${SHARED_IMAGE_FRAGMENT}
  ${RICHTEXT_FRAGMENT}
  ${LINK_IMAGE_FRAGMENT}
  query AddactPressReleases($filters: AddactPressReleaseFiltersInput) {
    addactPressReleases(filters: $filters) {
      SEO { ${SEO_FIELDS} }
      ${BLOG_HERO_BANNER_FIELDS}
      ${PRESS_CONTENT_FIELDS}
      ${SOCIAL_ICONS_FIELDS}
    }
  }
`;

export interface PressReleaseDetailResponse {
  addactPressReleases: {
    SEO: {
      metaTitle: string | null;
      metaDescription: string | null;
      ogTitle: string | null;
      ogDescription: string | null;
      ogImage: { url: string | null } | null;
      metaRobots: string | null;
      twitterCardTitle: string | null;
      canonicalURL: string | null;
      structuredData: Record<string, unknown> | null;
      languageTag: string | null;
    } | null;
    HeroBanner: {
      BannerTitle: string;
      BannerDescription: string;
      BannerImage: Image;
    }[];
    PressContent: Heading[];
    social_icons: {
      SocialIcon: {
        Title: string;
        Links: Link;
        Icons: Image;
        HoverIcon: Image;
      }[];
    }[];
  }[];
}

export async function getPressReleaseDetailBySlug(
  slug: string,
): Promise<PressReleaseDetailResponse> {
  const data = await client.request<PressReleaseDetailResponse>(GET_PRESS_RELEASE_DETAIL_PAGE, {
    filters: {
      Slug: {
        eq: `/${slug}`,
      },
    },
  });
  return data;
}
