import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import { COMMON_SECTION_FRAGMENT } from "../fragments/commonSectionFragment";
import { SEO_FIELDS, type SeoType } from "../fragments/seoFragment";
import { EVENT_HEADING_SECTION_FIELDS, type EventHeadingSectionType } from "../fragments/eventHeadingSectionFragment";
import { CASE_STUDY_HERO_BANNER_FIELDS, type CaseStudyHeroBannerType } from "../fragments/caseStudyHeroBannerFragment";
import { CASE_STUDY_CONTENT_FIELDS, type CaseStudyContentType } from "../fragments/caseStudyContentFragment";
import { CASE_STUDY_FORM_TITLE_FIELDS, type CaseStudyFormTitleType } from "../fragments/caseStudyFormTitleFragment";
import { CASE_STUDY_PDF_FORM_FIELDS, type CaseStudyPdfFormFieldsType } from "../fragments/caseStudyPdfFormFieldsFragment";
export type {
  EventHeadingSectionType,
  CaseStudyHeroBannerType,
  CaseStudyContentType,
  CaseStudyFormTitleType,
  CaseStudyPdfFormFieldsType,
  SeoType,
};
import client from "../client";

const GET_CASE_STUDY_BY_SLUG = gql`
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${SHARED_IMAGE_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
  ${RICHTEXT_FRAGMENT}
  ${COMMON_SECTION_FRAGMENT}
  query AddactCaseStudies($filters: AddactCaseStudyFiltersInput) {
    addactCaseStudies(filters: $filters) {
      SEO { ${SEO_FIELDS} }
      Slug
      ${EVENT_HEADING_SECTION_FIELDS}
      ${CASE_STUDY_HERO_BANNER_FIELDS}
      ${CASE_STUDY_CONTENT_FIELDS}
      ${CASE_STUDY_FORM_TITLE_FIELDS}
      ${CASE_STUDY_PDF_FORM_FIELDS}
    }
  }
`;

export type CaseStudyBySlugResponse = {
  addactCaseStudies: (CaseStudyHeroBannerType &
    CaseStudyContentType &
    CaseStudyFormTitleType &
    EventHeadingSectionType &
    CaseStudyPdfFormFieldsType & {
      SEO?: SeoType | null;
      Slug: string;
    })[];
};

export async function getCaseStudyBySlug(slug: string) {
  const data = await client.request<CaseStudyBySlugResponse>(GET_CASE_STUDY_BY_SLUG, {
    filters: {
      Slug: {
        eq: `/${slug}`,
      },
    },
  });

  return data.addactCaseStudies?.[0] || null;
}
