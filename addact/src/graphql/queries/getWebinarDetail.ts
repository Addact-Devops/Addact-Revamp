import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import client from "../client";
import { SEO_FIELDS, type WebinarSEO as SEO } from "../fragments/seoFragment";
export type { SEO };
import {
  WEBINAR_HERO_BANNER_FIELDS,
  type WebinarHeroBannerItem,
} from "../fragments/webinarHeroBannerFragment";
export type { WebinarHeroBannerItem };
import {
  WEBINAR_CONTENT_FIELDS,
  type WebinarContentItem,
} from "../fragments/webinarContentFragment";
export type { WebinarContentItem };
import {
  WEBINAR_SPEAKERS_FIELDS,
  type WebinarSpeakersType,
} from "../fragments/webinarSpeakersFragment";
export type { WebinarSpeakersType };
import { WEBINAR_HOST_FIELDS, type WebinarAuthorType } from "../fragments/webinarHostFragment";
export type { WebinarAuthorType };

const GET_WEBINAR_DETAIL_PAGE = gql`
  ${IMAGE_FRAGMENT}
  ${SHARED_IMAGE_FRAGMENT}
  ${RICHTEXT_FRAGMENT}
  query AddactWebinars($filters: AddactWebinarFiltersInput) {
    addactWebinars(filters: $filters) {
      SEO { ${SEO_FIELDS} }
      ${WEBINAR_HERO_BANNER_FIELDS}
      ${WEBINAR_CONTENT_FIELDS}
      ${WEBINAR_SPEAKERS_FIELDS}
      ${WEBINAR_HOST_FIELDS}
    }
  }
`;

export interface WebinarDetailItem {
  SEO?: SEO | null;
  HeroBanner: WebinarHeroBannerItem[];
  WebinarContent: WebinarContentItem[];
  Speakers: WebinarSpeakersType["Speakers"];
  Host: WebinarAuthorType[];
}

export interface WebinarDetailResponse {
  addactWebinars: WebinarDetailItem[];
}

export async function getWebinarDetailBySlug(slug: string): Promise<WebinarDetailResponse> {
  const data = await client.request<WebinarDetailResponse>(GET_WEBINAR_DETAIL_PAGE, {
    filters: {
      Slug: {
        eq: `/${slug}`,
      },
    },
  });
  return data;
}
