import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import { LINK_IMAGE_FRAGMENT } from "../fragments/linkImageFragment";
import { SEO_FIELDS, type SeoType as SEO } from "../fragments/seoFragment";
export type { SEO };
import { BLOG_HERO_BANNER_FIELDS } from "../fragments/blogHeroBannerFragment";
import { type AddactPressReleaseItem } from "../fragments/pressReleaseHeroBannerFragment";
export type { AddactPressReleaseItem };
import { PRESS_CONTENT_FIELDS, type PressContentType } from "../fragments/pressContentFragment";
export type { PressContentType };
import { SOCIAL_ICONS_FIELDS, type SocialIcon } from "../fragments/socialIconsFragment";
export type { SocialIcon };
import client from "../client";
import { Image } from "@/types/common";

const GET_PRESS_RELEASE_DETAIL_PAGE = gql`
  ${LINK_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${SHARED_IMAGE_FRAGMENT}
  ${RICHTEXT_FRAGMENT}
  ${LINK_IMAGE_FRAGMENT}
  query AddactPressReleases($filters: AddactPressReleaseFiltersInput) {
    addactPressReleases(filters: $filters) {
      SEO { ${SEO_FIELDS} }
      ${BLOG_HERO_BANNER_FIELDS}
      ${PRESS_CONTENT_FIELDS}
      ${SOCIAL_ICONS_FIELDS}
    }
  }
`;

export interface PressReleaseDetailItem extends PressContentType {
  SEO: SEO | null;
  HeroBanner: {
    BannerTitle: string;
    BannerDescription: string;
    BannerImage: Image;
  }[];
  social_icons: {
    SocialIcon: SocialIcon[];
  }[];
}

export interface PressReleaseDetailResponse {
  addactPressReleases: PressReleaseDetailItem[];
}

export async function getPressReleaseDetailBySlug(
  slug: string,
): Promise<PressReleaseDetailResponse> {
  const data = await client.request<PressReleaseDetailResponse>(GET_PRESS_RELEASE_DETAIL_PAGE, {
    filters: {
      Slug: {
        eq: `/${slug}`,
      },
    },
  });
  return data;
}
