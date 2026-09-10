import { gql } from "graphql-request";
import client from "../client";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { PAGE_HEADING_FIELDS } from "../fragments/pageHeadingFragment";
import type { PageHeadingType } from "../fragments/pageHeadingFragment";
import { EVENT_BANNER_FIELDS } from "../fragments/eventBannerFragment";
import type { EventBannerType } from "../fragments/eventBannerFragment";
import { EVENT_BLOG_HERO_BANNER_FIELDS } from "../fragments/eventBlogHeroBannerFragment";
import type { EventBlogHeroBannerType } from "../fragments/eventBlogHeroBannerFragment";

const GET_EVENT_LIST_PAGE = gql`
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  query EventList {
    event {
      ${EVENT_BANNER_FIELDS}
      ${PAGE_HEADING_FIELDS}
    }
    addactsEvents {
      ${EVENT_BLOG_HERO_BANNER_FIELDS}
      EventSummary
      Slug
    }
  }
`;

export interface EventListResponse {
  event: EventBannerType & {
    PageHeading: PageHeadingType["PageHeading"][];
  };
  addactsEvents: (EventBlogHeroBannerType & {
    EventSummary: string;
    Slug: string;
  })[];
}

export async function getEventListPageData(): Promise<EventListResponse> {
  const data = await client.request<EventListResponse>(GET_EVENT_LIST_PAGE);
  return data;
}
