import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import { LINK_IMAGE_FRAGMENT } from "../fragments/linkImageFragment";
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
      SEO {
        metaTitle
        metaDescription
        ogTitle
        ogDescription
        ogImage {
          url
        }
        metaRobots
        twitterCardTitle
        canonicalURL
        structuredData
        languageTag
      }
      HeroBanner {
        ... on ComponentBlogHeroBannerBlogHeroBanner {
          BannerTitle
          BannerDescription
          BannerImage {
            alternativeText
            height
            name
            url
            width
          }
        }
      }
      PressContent {
        ... on ComponentSharedLink {
          id
          href
          label
          isExternal
        }
        ... on ComponentSharedImage { ...SharedImageFields }
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
        ... on ComponentBaseTemplateRichtext { ...RichtextFields }
      }
      social_icons {
        SocialIcon {
          ... on ComponentBaseTemplateLinkImage { ...LinkImageFields }
        }
      }
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
