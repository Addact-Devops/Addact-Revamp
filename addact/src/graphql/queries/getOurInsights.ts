import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { COMMON_SECTION_FRAGMENT } from "../fragments/commonSectionFragment";
import { OUR_INSIGHTS_BLOG_FIELDS } from "../fragments/ourInsightsBlogFragment";
import { OUR_INSIGHTS_CASE_STUDY_FIELDS } from "../fragments/ourInsightsCaseStudyFragment";
import { OUR_INSIGHTS_TITLE_FIELDS } from "../fragments/ourInsightsTitleFragment";
import client from "../client";

const ourInsights_Query = gql`
  ${IMAGE_FRAGMENT}
  ${COMMON_SECTION_FRAGMENT}
  query AddactBlogsAndCaseStudy {
    ${OUR_INSIGHTS_BLOG_FIELDS}
    ${OUR_INSIGHTS_CASE_STUDY_FIELDS}
  }
`;

export interface AddactBlogsAndCaseStudyResponse {
  addactBlogs: AddactBlog[];
  addactCaseStudies: AddactCaseStudy[];
}

export interface AddactBlog {
  documentId: string;
  Slug: string;
  createdAt: string;
  HeadingSection: BlogHeadingSection[];
  BlogBanner: BlogBanner[];
}

export interface BlogHeadingSection {
  PageTitle: string;
}

export interface BlogBanner {
  id: string;
  BannerImage: BannerImage;
  BannerDescription: string;
  BannerTitle: string;
  PublishDate: string;
  ReadNow: ReadNowLink;
}
export interface AddactCaseStudy {
  ReferenceTitle: string;
  HeroBanner: CaseStudyHeroBanner[];
}

export interface CaseStudyHeroBanner {
  BannerImage: BannerImage;
  BannerTitle: string;
  ReadNow: ReadNowLink;
  PublishDate: string;
  BannerDescription: string;
}
export interface BannerImage {
  width: number;
  height: number;
  url: string;
  name: string;
  alternativeText: string | null;
}

export interface ReadNowLink {
  href: string;
  id: string;
  isExternal: boolean;
  label: string;
  target: string;
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

export interface OurInsightsTitle {
  CommonTitle: TitleWithDescription[];
}

export interface TitleWithDescription {
  Title: string;
  Description: string;
  Link: Link;
}

export interface Link {
  id: string;
  href: string;
  label: string;
  target: string;
  isExternal: boolean;
  SubDisc: string | null;
  Icon: Icon | null;
}

export interface Icon {
  alternativeText: string | null;
  height: number;
  url: string;
  width: number;
}

export async function getHomeOurInsightsTitle(): Promise<HomeResponse> {
  const data = await client.request<HomeResponse>(home_Query);
  return data;
}
