import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HERO_BANNER_FRAGMENT } from "../fragments/heroBannerFragment";
import client from "../client";
import { PAGE_HERO_BANNER_FIELDS, type PageHeroBannerType } from "../fragments/pageHeroBannerFragment";
import { PAGE_HEADING_FIELDS, type PageHeadingType } from "../fragments/pageHeadingFragment";
import { WEBINAR_HERO_BANNER_FIELDS, type WebinarHeroBannerType } from "../fragments/webinarHeroBannerFragment";

const GET_WEBINAR_LIST_PAGE = gql`
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${HERO_BANNER_FRAGMENT}
  query WebinarList {
    webinar {
      ${PAGE_HERO_BANNER_FIELDS}
      ${PAGE_HEADING_FIELDS}
    }
    addactWebinars {
      Slug
      ReferenceTitle
      ${WEBINAR_HERO_BANNER_FIELDS}
      WebinarSummary
    }
  }
`;

export interface WebinarListResponse {
  webinar: PageHeroBannerType & PageHeadingType;
  addactWebinars: {
    Slug: string;
    ReferenceTitle: string;
    HeroBanner: WebinarHeroBannerType["HeroBanner"];
    WebinarSummary: string;
  }[];
}

export async function getWebinarListData(): Promise<WebinarListResponse> {
  const data = await client.request<WebinarListResponse>(GET_WEBINAR_LIST_PAGE);
  return data;
}
