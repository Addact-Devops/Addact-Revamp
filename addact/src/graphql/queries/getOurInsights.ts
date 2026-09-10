import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { COMMON_SECTION_FRAGMENT } from "../fragments/commonSectionFragment";
import { OUR_INSIGHTS_BLOG_FIELDS, type AddactBlog } from "../fragments/ourInsightsBlogFragment";
import { OUR_INSIGHTS_CASE_STUDY_FIELDS, type AddactCaseStudy } from "../fragments/ourInsightsCaseStudyFragment";
import { OUR_INSIGHTS_TITLE_FIELDS, type OurInsightsTitle } from "../fragments/ourInsightsTitleFragment";
import client from "../client";

const ourInsights_Query = gql`
  ${LINK_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${COMMON_SECTION_FRAGMENT}
  query AddactBlogsAndCaseStudy {
    ${OUR_INSIGHTS_BLOG_FIELDS}
    ${OUR_INSIGHTS_CASE_STUDY_FIELDS}
  }
`;

export type { AddactBlog } from "../fragments/ourInsightsBlogFragment";
export type { AddactCaseStudy } from "../fragments/ourInsightsCaseStudyFragment";

export interface AddactBlogsAndCaseStudyResponse {
  addactBlogs: AddactBlog[];
  addactCaseStudies: AddactCaseStudy[];
}

export async function getOurInsights(): Promise<AddactBlogsAndCaseStudyResponse> {
  const data = await client.request<AddactBlogsAndCaseStudyResponse>(ourInsights_Query);
  return data;
}

// Home Query for insights title and description
const home_Query = gql`
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
  query Home {
    home {
      ${OUR_INSIGHTS_TITLE_FIELDS}
    }
  }
`;

export interface HomeResponse {
  home: HomeData;
}

export interface HomeData {
  ourInshightsTitle: OurInsightsTitle;
}

export async function getHomeOurInsightsTitle(): Promise<HomeResponse> {
  const data = await client.request<HomeResponse>(home_Query);
  return data;
}
