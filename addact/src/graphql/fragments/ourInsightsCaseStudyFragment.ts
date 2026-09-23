import { HERO_BANNER_FULL_FIELDS, type BlogBannerItem } from "./blogHeroBannerFieldsFragment";
import type { SlugType } from "@/types/common";

export const OUR_INSIGHTS_CASE_STUDY_FIELDS = `
  addactCaseStudies(pagination: { page: 1, pageSize: 2 }, sort: ["publishedAt:desc"]) {
    ReferenceTitle
    Slug
    ${HERO_BANNER_FULL_FIELDS}
  }
`;

export type CaseStudyHeroBanner = BlogBannerItem;

export type AddactCaseStudy = SlugType & {
  ReferenceTitle: string;
  HeroBanner: CaseStudyHeroBanner[];
};

export type OurInsightsCaseStudyType = {
  addactCaseStudies: AddactCaseStudy[];
};
