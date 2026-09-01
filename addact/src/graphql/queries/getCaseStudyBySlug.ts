import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import { COMMON_SECTION_FRAGMENT } from "../fragments/commonSectionFragment";
import { SEO_FIELDS } from "../fragments/seoFragment";
import { EVENT_HEADING_SECTION_FIELDS } from "../fragments/eventHeadingSectionFragment";
import { CASE_STUDY_HERO_BANNER_FIELDS } from "../fragments/caseStudyHeroBannerFragment";
import { CASE_STUDY_CONTENT_FIELDS } from "../fragments/caseStudyContentFragment";
import { CASE_STUDY_FORM_TITLE_FIELDS } from "../fragments/caseStudyFormTitleFragment";
import { CASE_STUDY_PDF_FORM_FIELDS } from "../fragments/caseStudyPdfFormFieldsFragment";
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
  addactCaseStudies: {
    SEO: {
      metaTitle: string | null;
      metaDescription: string | null;
      ogTitle: string | null;
      ogDescription: string | null;
      ogImage: { url: string | null } | null;
      metaRobots: string | null;
      twitterCardTitle: string | null;
      canonicalURL: string | null;
      structuredData: Record<string, unknown> | null;
      languageTag: string | null;
    } | null;
    Slug: string;
    HeadingSection: {
      PageTitle: string;
    }[];
    HeroBanner: {
      id: string;
      BannerTitle: string;
      BannerDescription: string;
      PublishDate: string;
      BannerImage: {
        width: number;
        name: string;
        height: number;
        url: string;
      };
      blogcategory: string;
      author: string;
      ReadNow: string;
    }[];
    CaseStudyContent: {
      id: string;
      h2?: string;
      Richtext?: string;
      h3?: string;
    }[];
    FormTitle: {
      CommonTitle: {
        Title: string;
        Description: string;
      }[];
    };
    CaseStudyPDF: {
      url: string;
      width: string;
      name: string;
      height: string;
    };
    FormFields: {
      NameLable: string;
      EmailLabel: string;
      PhoneLabel: string;
      ButtonLabel: string;
      RecipientEmails: string;
    };
  }[];
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
