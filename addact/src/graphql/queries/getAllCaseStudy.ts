import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HERO_BANNER_FRAGMENT } from "../fragments/heroBannerFragment";
import { CASE_STUDY_BANNER_FIELDS, type CaseStudyBannerType } from "../fragments/caseStudyBannerFragment";
export type { CaseStudyBannerType };
import { CASE_STUDY_CARD_FIELDS, type CaseStudyCardType } from "../fragments/caseStudyCardFragment";
export type { CaseStudyCardType };
import client from "../client";

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
  addactCaseStudies: CaseStudyCardType[];
}

export async function getAllCaseStudyData(): Promise<IAllCaseStudy> {
  const data = await client.request<IAllCaseStudy>(GET_ALL_CASE_STUDY);
  return data;
}

