import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { HERO_BANNER_FRAGMENT } from "../fragments/heroBannerFragment";
import client from "../client";
import { Image } from "@/types/common";

const GET_WEBINAR_LIST_PAGE = gql`
  ${IMAGE_FRAGMENT}
  ${HERO_BANNER_FRAGMENT}
  query WebinarList {
    webinar {
      HeroBanner {
        Banner {
          ... on ComponentBannerBanner {
            ...HeroBannerFields
          }
        }
      }
      PageHeading {
        PageTitle
        Slug
      }
    }
    addactWebinars {
      Slug
      ReferenceTitle
      HeroBanner {
        ... on ComponentBlogHeroBannerBlogHeroBanner {
          ...HeroBannerFields
          PublishDate
          ReadNow {
            id
            href
            label
            isExternal
          }
        }
      }
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
