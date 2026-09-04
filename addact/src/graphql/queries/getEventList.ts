import { gql } from "graphql-request";
import client from "../client";
import { Image, Link } from "@/types/common";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { PAGE_HEADING_FIELDS } from "../fragments/pageHeadingFragment";
import { EVENT_BANNER_FIELDS } from "../fragments/eventBannerFragment";
import { EVENT_BLOG_HERO_BANNER_FIELDS } from "../fragments/eventBlogHeroBannerFragment";

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
  event: {
    EventBanner: {
      Banner: {
        BannerDescription: string;
        BannerImage: Image;
        BannerLink: Link;
        BannerTitle: string;
      }[];
    };
    PageHeading: {
      PageTitle: string;
      Slug: string;
    }[];
  };
  addactsEvents: {
    EventBanner: {
      BannerImage: Image;
      BannerTitle: string;
      PublishDate: string;
      eventLocation: string;
    }[];
    EventSummary: string;
    Slug: string;
  }[];
}

export async function getEventListPageData(): Promise<EventListResponse> {
  const data = await client.request<EventListResponse>(GET_EVENT_LIST_PAGE);
  return data;
}
