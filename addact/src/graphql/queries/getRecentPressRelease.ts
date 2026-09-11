import { gql } from "graphql-request";
import client from "../client";
import { BLOG_HERO_BANNER_FIELDS, type BlogHeroBannerItem } from "../fragments/blogHeroBannerFragment";
export type { BlogHeroBannerItem };

const GET_RECENT_PRESS_RELEASE = gql`
  query Recentitem($pagination: PaginationArg, $sort: [String]) {
    addactPressReleases(pagination: $pagination, sort: $sort) {
      ${BLOG_HERO_BANNER_FIELDS}
      Slug
    }
  }
`;

export interface RecentPressRelease {
  addactPressReleases: {
    HeroBanner: BlogHeroBannerItem[];
    Slug: string;
  }[];
}

export async function getRecentPressRelease(options: {
  pagination?: { limit?: number; start?: number };
  sort?: string[];
}): Promise<RecentPressRelease> {
  const variables = {
    pagination: options.pagination,
    sort: options.sort,
  };

  const data = await client.request<RecentPressRelease>(GET_RECENT_PRESS_RELEASE, variables);
  return data;
}
