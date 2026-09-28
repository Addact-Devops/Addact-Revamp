import { gql } from "graphql-request";
import client from "../client";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { PAGE_HEADING_FIELDS, type PageHeadingType } from "../fragments/pageHeadingFragment";
import { COMPONENT_BANNER_FIELDS, type BannerSection } from "../fragments/componentBannerFieldsFragment";
import { EVENT_BLOG_HERO_BANNER_FIELDS, type EventBlogHeroBannerType } from "../fragments/eventBlogHeroBannerFragment";
export type { PageHeadingType, EventBlogHeroBannerType };
export type EventBannerType = { EventBanner: BannerSection };

const GET_EVENT_LIST_PAGE = gql`
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  query EventList {
    event {
      EventBanner {
        Banner {
          ${COMPONENT_BANNER_FIELDS}
        }
      }
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
