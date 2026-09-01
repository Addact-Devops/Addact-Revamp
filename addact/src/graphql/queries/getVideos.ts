// src/graphql/queries/getVideos.ts

import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { HERO_BANNER_FRAGMENT } from "../fragments/heroBannerFragment";
import { PAGE_HEADING_FIELDS } from "../fragments/pageHeadingFragment";
import { VIDEO_BANNER_FIELDS } from "../fragments/videoBannerFragment";
import { VIDEO_LIST_FIELDS } from "../fragments/videoListFragment";
import client from "../client";

// -----------------------------
// ✅ Types
// -----------------------------

export type VideoBannerType = {
  BannerTitle?: string;
  BannerDescription?: string;
  BannerImage?: {
    url?: string;
    width?: number;
    height?: number;
    alternativeText?: string | null;
  };
};

export type VideoContentType = {
  Content: {
    Title: string;
    Description: string;
    Link: {
      isExternal: boolean;
      href: string;
      label: string;
    };
  };
  Iframe: {
    Richtext: string;
  };
};

export type VideoPageResponse = {
  videoListing: {
    PageHeading: {
      PageTitle: string;
      Slug: string;
    };
    banner: {
      Banner: VideoBannerType[];
    };
    VideoList: VideoContentType[];
  };
};

// -----------------------------
// ✅ GraphQL Query
// -----------------------------

const videosQuery = gql`
  ${IMAGE_FRAGMENT}
  ${HERO_BANNER_FRAGMENT}
  query VideoListing {
    videoListing {
      ${PAGE_HEADING_FIELDS}
      ${VIDEO_BANNER_FIELDS}
      ${VIDEO_LIST_FIELDS}
    }
  }
`;

// -----------------------------
// ✅ Fetch Function
// -----------------------------

export const getVideosPageData = async (): Promise<VideoPageResponse> => {
  const data = await client.request(videosQuery);
  return data as VideoPageResponse;
};
