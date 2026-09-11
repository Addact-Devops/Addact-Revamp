import { CASE_STUDY_HERO_BANNER_FIELDS, type CaseStudyHeroBannerType } from "./caseStudyHeroBannerFragment";

export type CaseStudyCardType = CaseStudyHeroBannerType & {
  ReferenceTitle?: string;
  Slug?: string;
  caseStudySummary?: string;
  documentId?: string;
};

export const CASE_STUDY_CARD_FIELDS = `
  ReferenceTitle
  Slug
  ${CASE_STUDY_HERO_BANNER_FIELDS}
  caseStudySummary
  documentId
`;

