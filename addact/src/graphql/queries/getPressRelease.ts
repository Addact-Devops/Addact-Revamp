import client from "../client";
import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HERO_BANNER_FRAGMENT } from "../fragments/heroBannerFragment";
import { BLOG_HERO_BANNER_FIELDS } from "../fragments/blogHeroBannerFragment";
import { PAGE_HEADING_FIELDS, type PageHeadingType } from "../fragments/pageHeadingFragment";
import { PRESS_RELEASE_HERO_BANNER_FIELDS, type PressReleaseHeroBannerType } from "../fragments/pressReleaseHeroBannerFragment";
import { Image } from "@/types/common";

const GET_PRESS_RELEASE_LIST_PAGE = gql`
  ${LINK_FRAGMENT}
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
  pressRelease: PageHeadingType & PressReleaseHeroBannerType;
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
