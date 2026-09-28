// src/graphql/queries/getVideos.ts

import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HERO_BANNER_FRAGMENT, BANNER_HERO_SECTION_FIELDS } from "../fragments/heroBannerFragment";
import { PAGE_HEADING_FIELDS } from "../fragments/pageHeadingFragment";
import { VIDEO_LIST_FIELDS, type VideoPageResponse } from "../fragments/videoListFragment";

export type { VideoContentType, VideoPageResponse } from "../fragments/videoListFragment";
import client from "../client";

// -----------------------------
// ✅ GraphQL Query
// -----------------------------

const videosQuery = gql`
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${HERO_BANNER_FRAGMENT}
  query VideoListing {
    videoListing {
      ${PAGE_HEADING_FIELDS}
      ${BANNER_HERO_SECTION_FIELDS}
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
