import { gql } from "graphql-request";
import { IMAGE_FRAGMENT, type ImageFragmentType } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HERO_BANNER_FRAGMENT } from "../fragments/heroBannerFragment";
import { CASE_STUDY_BANNER_FIELDS, type CaseStudyBannerType } from "../fragments/caseStudyBannerFragment";
import { CASE_STUDY_CARD_FIELDS } from "../fragments/caseStudyCardFragment";
import client from "../client";

// Reusing ImageFragmentType from imageFragment

const GET_ALL_CASE_STUDY = gql`
  ${LINK_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${HERO_BANNER_FRAGMENT}
  query CaseStudyList {
    caseStudy {
      ${CASE_STUDY_BANNER_FIELDS}
    }
    addactCaseStudies(pagination: { page: 1, pageSize: 50 }) {
      ${CASE_STUDY_CARD_FIELDS}
    }
  }
`;

export interface IAllCaseStudy {
  caseStudy: CaseStudyBannerType;
  addactCaseStudies: {
    ReferenceTitle: string;
    Slug: string;
    HeroBanner: {
      PublishDate: string;
      BannerTitle: string;
      BannerImage: ImageFragmentType & { alternativeText: string };
    }[];
    caseStudySummary: string;
    documentId: string;
  }[];
}

export async function getAllCaseStudyData(): Promise<IAllCaseStudy> {
  const data = await client.request<IAllCaseStudy>(GET_ALL_CASE_STUDY);
  return data;
}
