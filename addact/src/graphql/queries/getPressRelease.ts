import { Image } from "@/types/common";
import client from "../client";
import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { HERO_BANNER_FRAGMENT } from "../fragments/heroBannerFragment";
import { BLOG_HERO_BANNER_FIELDS } from "../fragments/blogHeroBannerFragment";
import { PAGE_HEADING_FIELDS } from "../fragments/pageHeadingFragment";
import { PRESS_RELEASE_HERO_BANNER_FIELDS } from "../fragments/pressReleaseHeroBannerFragment";

const GET_PRESS_RELEASE_LIST_PAGE = gql`
  ${IMAGE_FRAGMENT}
  ${HERO_BANNER_FRAGMENT}
  query PressRelease {
    pressRelease {
      ${PAGE_HEADING_FIELDS}
      ${PRESS_RELEASE_HERO_BANNER_FIELDS}
    }
    addactPressReleases {
      Slug
      ${BLOG_HERO_BANNER_FIELDS}
      PressReleaseSummary
    }
  }
`;

export interface PressReleaseResponse {
  pressRelease: {
    PageHeading: {
      PageTitle: string;
      Slug: string;
    };
    HeroBanner: {
      Banner: {
        BannerDescription: string;
        BannerTitle: string;
        BannerImage: Image;
      }[];
    };
  };
  addactPressReleases: {
    Slug: string;
    HeroBanner: {
      BannerTitle: string;
      BannerImage: Image;
    }[];
    PressReleaseSummary: string;
  }[];
}

export async function getPressReleaseData(): Promise<PressReleaseResponse> {
  const data = await client.request<PressReleaseResponse>(GET_PRESS_RELEASE_LIST_PAGE);
  return data;
}
