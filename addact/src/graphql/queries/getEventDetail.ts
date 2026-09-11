import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import { COMMON_SECTION_FRAGMENT } from "../fragments/commonSectionFragment";
import { SEO_FIELDS, type SeoType } from "../fragments/seoFragment";
import { EVENT_BLOG_HERO_BANNER_FIELDS, type EventBlogHeroBannerType } from "../fragments/eventBlogHeroBannerFragment";
import { EVENT_CONTENT_FIELDS, type EventContentType } from "../fragments/eventContentFragment";
import { EVENT_HEADING_SECTION_FIELDS, type EventHeadingSectionType } from "../fragments/eventHeadingSectionFragment";
import { EVENT_CONTACT_US_CARD_FIELDS, type EventContactUsCardType } from "../fragments/eventContactUsCardFragment";
export type { SeoType, EventBlogHeroBannerType, EventContentType, EventHeadingSectionType, EventContactUsCardType };
import client from "../client";

const GET_EVENT_DETAIL_PAGE = gql`
  ${LINK_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${SHARED_IMAGE_FRAGMENT}
  ${RICHTEXT_FRAGMENT}
  ${COMMON_SECTION_FRAGMENT}

  query AddactsEvents($filters: AddactEventsFiltersInput) {
    addactsEvents(filters: $filters) {
      ${EVENT_BLOG_HERO_BANNER_FIELDS}
      ${EVENT_CONTENT_FIELDS}
      ${EVENT_HEADING_SECTION_FIELDS}
      ${EVENT_CONTACT_US_CARD_FIELDS}
      SEO { ${SEO_FIELDS} }
    }
  }
`;

export interface EventDetailResponse {
  addactsEvents: (EventBlogHeroBannerType & EventContentType & EventHeadingSectionType & EventContactUsCardType & {
    SEO?: SeoType | null;
  })[];
}

export async function getEventDetailBySlug(slug: string): Promise<EventDetailResponse> {
  const data = await client.request<EventDetailResponse>(GET_EVENT_DETAIL_PAGE, {
    filters: {
      Slug: {
        eq: `/${slug}`,
      },
    },
  });
  return data;
}
