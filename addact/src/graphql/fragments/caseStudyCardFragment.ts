import { CASE_STUDY_HERO_BANNER_FIELDS, type CaseStudyHeroBannerType } from "./caseStudyHeroBannerFragment";
import type { SlugType } from "@/types/common";

export type CaseStudyCardType = CaseStudyHeroBannerType & SlugType & {
  ReferenceTitle?: string;
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

