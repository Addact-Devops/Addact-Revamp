import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import { SEO_FIELDS, type SeoType as SEO, type ThankYouPageSEO } from "../fragments/seoFragment";
export type { SEO, ThankYouPageSEO };
import { THANK_YOU_CONTENT_FIELDS, type Content } from "../fragments/thankYouContentFragment";
export type { Content };
import { THANK_YOU_ANIMATION_VIDEO_FIELDS, type AnimationVideo } from "../fragments/thankYouAnimationVideoFragment";
export type { AnimationVideo };
import client from "../client";

const GET_THANK_YOU_PAGE = gql`
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${RICHTEXT_FRAGMENT}
  query ThankyouPages($filters: ThankyouPageFiltersInput) {
    thankyouPages(filters: $filters) {
      ReferenceTitle
      Slug
      SEO {
        ${SEO_FIELDS}
      }
      ${THANK_YOU_CONTENT_FIELDS}
      ${THANK_YOU_ANIMATION_VIDEO_FIELDS}
    }
  }
`;

export interface ThankYouPageItem {
  ReferenceTitle: string;
  Slug: string;
  Content: Content[];
  AnimationVideo: AnimationVideo;
  SEO?: ThankYouPageSEO | null;
}

export interface ThankYouPageResponse {
  thankyouPages: ThankYouPageItem[];
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
