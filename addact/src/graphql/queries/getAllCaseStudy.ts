import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { HERO_BANNER_FRAGMENT } from "../fragments/heroBannerFragment";
import { CASE_STUDY_BANNER_FIELDS } from "../fragments/caseStudyBannerFragment";
import { CASE_STUDY_CARD_FIELDS } from "../fragments/caseStudyCardFragment";
import client from "../client";

const GET_ALL_CASE_STUDY = gql`
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

type Image = {
  alternativeText: string;
  name: string;
  height: number;
  url: string;
  width: number;
};

export interface IAllCaseStudy {
  caseStudy: {
    CaseStudyBanner: {
      Banner: {
        BannerTitle: string;
        BannerDescription: string;
        BannerImage: Image;
        show_searchbox: boolean;
      }[];
    };
  };
  addactCaseStudies: {
    ReferenceTitle: string;
    Slug: string;
    HeroBanner: {
      PublishDate: string;
      BannerTitle: string;
      BannerImage: Image;
    }[];
    caseStudySummary: string;
    documentId: string;
  }[];
}

export async function getAllCaseStudyData(): Promise<IAllCaseStudy> {
  const data = await client.request<IAllCaseStudy>(GET_ALL_CASE_STUDY);
  return data;
}
