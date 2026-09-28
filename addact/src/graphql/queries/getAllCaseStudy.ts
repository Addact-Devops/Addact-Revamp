import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import {
  HERO_BANNER_FRAGMENT,
  CASE_STUDY_BANNER_SECTION_FIELDS,
  type HeroBannerFragmentType,
} from "../fragments/heroBannerFragment";
import client from "../client";
import {
  CASE_STUDY_HERO_BANNER_FIELDS,
  type CaseStudyHeroBannerType,
} from "../fragments/caseStudyHeroBannerFragment";
import type { SlugType } from "@/types/common";

export type CaseStudyBannerType = {
  CaseStudyBanner: {
    Banner: HeroBannerFragmentType[];
  };
};

export type CaseStudyCardType = CaseStudyHeroBannerType &
  SlugType & {
    ReferenceTitle?: string;
    caseStudySummary?: string;
    documentId?: string;
  };

const GET_ALL_CASE_STUDY = gql`
  ${LINK_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${HERO_BANNER_FRAGMENT}
  query CaseStudyList {
    caseStudy {
      ${CASE_STUDY_BANNER_SECTION_FIELDS}
    }
    addactCaseStudies(pagination: { page: 1, pageSize: 50 }) {
      ReferenceTitle
      Slug
      ${CASE_STUDY_HERO_BANNER_FIELDS}
      caseStudySummary
      documentId
    }
  }
`;

export interface IAllCaseStudy {
  caseStudy: CaseStudyBannerType;
  addactCaseStudies: CaseStudyCardType[];
}

export async function getAllCaseStudyData(): Promise<IAllCaseStudy> {
  const data = await client.request<IAllCaseStudy>(GET_ALL_CASE_STUDY);
  return data;
}
