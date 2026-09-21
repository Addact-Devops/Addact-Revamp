import { HERO_BANNER_FULL_FIELDS, type BlogBannerItem } from "./blogHeroBannerFieldsFragment";

export const OUR_INSIGHTS_CASE_STUDY_FIELDS = `
  addactCaseStudies(pagination: { page: 1, pageSize: 2 }, sort: ["publishedAt:desc"]) {
    ReferenceTitle
    Slug
    ${HERO_BANNER_FULL_FIELDS}
  }
`;

export type CaseStudyHeroBanner = BlogBannerItem;

export type AddactCaseStudy = {
  ReferenceTitle: string;
  Slug?: string;
  HeroBanner: CaseStudyHeroBanner[];
};

export type OurInsightsCaseStudyType = {
  addactCaseStudies: AddactCaseStudy[];
};
