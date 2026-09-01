import { gql } from "graphql-request";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import { SEO_FIELDS } from "../fragments/seoFragment";
import { THANK_YOU_CONTENT_FIELDS } from "../fragments/thankYouContentFragment";
import client from "../client";

const GET_THANK_YOU_PAGE = gql`
  ${RICHTEXT_FRAGMENT}
  query ThankyouPages($filters: ThankyouPageFiltersInput) {
    thankyouPages(filters: $filters) {
      ReferenceTitle
      Slug
      SEO {
        ${SEO_FIELDS}
      }
      ${THANK_YOU_CONTENT_FIELDS}
      AnimationVideo {
        alternativeText
        name
        url
      }
    }
  }
`;

export interface ThankYouPageResponse {
  thankyouPages: {
    ReferenceTitle: string;
    Slug: string;
    Content: Content[];
    AnimationVideo: {
      alternativeText: string;
      name: string;
      url: string;
    };
    SEO?: {
      metaTitle?: string;
      metaDescription?: string;
      ogTitle?: string;
      ogDescription?: string;
      ogImage?: { url?: string };
      metaRobots?: string;
      twitterCardTitle?: string;
      canonicalURL?: string;
      structuredData?: Record<string, unknown>;
      languageTag?: string;
    } | null;
  }[];
}

export interface Content {
  id: string;
  h1?: string;
  Richtext?: string;
  href?: string;
  label?: string;
  target?: string;
  isExternal?: boolean;
}

export async function getThankYouPageBySlug(slug: string): Promise<ThankYouPageResponse> {
  // Ensure slug starts with leading slash because data has leading slash in Slug field
  const cleanSlug = slug.startsWith("/") ? slug : `/${slug}`;

  const data = await client.request<ThankYouPageResponse>(GET_THANK_YOU_PAGE, {
    filters: {
      Slug: {
        eq: cleanSlug,
      },
    },
  });

  return data;
}
