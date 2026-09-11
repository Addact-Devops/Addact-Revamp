import client from "../client";
import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HERO_BANNER_FRAGMENT } from "../fragments/heroBannerFragment";
import { BLOG_HERO_BANNER_FIELDS } from "../fragments/blogHeroBannerFragment";
import { PAGE_HEADING_FIELDS, type PageHeadingType } from "../fragments/pageHeadingFragment";
export type { PageHeadingType };
import { PRESS_RELEASE_HERO_BANNER_FIELDS, type PressReleaseHeroBannerType, type AddactPressReleaseItem } from "../fragments/pressReleaseHeroBannerFragment";
export type { PressReleaseHeroBannerType, AddactPressReleaseItem };

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
  addactPressReleases: AddactPressReleaseItem[];
}

export async function getPressReleaseData(): Promise<PressReleaseResponse> {
  const data = await client.request<PressReleaseResponse>(GET_PRESS_RELEASE_LIST_PAGE);
  return data;
}
