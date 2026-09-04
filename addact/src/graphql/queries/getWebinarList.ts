import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HERO_BANNER_FRAGMENT } from "../fragments/heroBannerFragment";
import client from "../client";
import { Image } from "@/types/common";
import { PAGE_HERO_BANNER_FIELDS } from "../fragments/pageHeroBannerFragment";
import { PAGE_HEADING_FIELDS } from "../fragments/pageHeadingFragment";
import { WEBINAR_HERO_BANNER_FIELDS } from "../fragments/webinarHeroBannerFragment";

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
  webinar: {
    HeroBanner: {
      Banner: {
        BannerTitle: string;
        BannerDescription: string;
        BannerImage: Image;
        ReadNow: {
          id: string;
          href: string;
          label: string;
          isExternal: boolean;
        };
      }[];
    };
    PageHeading: {
      PageTitle: string;
      Slug: string;
    };
  };
  addactWebinars: {
    Slug: string;
    ReferenceTitle: string;
    HeroBanner: {
      BannerTitle: string;
      BannerDescription: string;
      BannerImage: Image;
      PublishDate: string;
      ReadNow: {
        id: string;
        href: string;
        label: string;
        isExternal: boolean;
      };
    }[];
    WebinarSummary: string;
  }[];
}

export async function getWebinarListData(): Promise<WebinarListResponse> {
  const data = await client.request<WebinarListResponse>(GET_WEBINAR_LIST_PAGE);
  return data;
}
