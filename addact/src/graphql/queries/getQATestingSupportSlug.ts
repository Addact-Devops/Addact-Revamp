import { FAQ_FIELDS, type FAQ } from "../fragments/faqFragment";
export type { FAQ } from "../fragments/faqFragment";
import client from "../client";
import { gql } from "graphql-request";
import { HEADING_FRAGMENT } from "../fragments/headingFragment";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { CTA_FIELDS, type CTA } from "../fragments/ctaFragment";
export type { CTA } from "../fragments/ctaFragment";
import { INDUSTRY_FIELDS, type Industry } from "../fragments/industryFragment";
export type { Industry, IndustryListItem } from "../fragments/industryFragment";
import { OUR_PROCESS_FIELDS, type OurProcess } from "../fragments/ourProcessFragment";
export type { OurProcess, ProcessDataItem, LinkProps } from "../fragments/ourProcessFragment";
import { TECH_STACK_FIELDS, type TechStack } from "../fragments/techStackFragment";
export type { TechStack, Tab, TabContent } from "../fragments/techStackFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { OUR_SERVICE_FRAGMENT } from "../fragments/ourServiceFragment";
import { AI_BANNER_SECTION_FIELDS, type BannerSection } from "../fragments/aiBannerSectionFragment";
export type { BannerSection, BannerItem, BannerLink } from "../fragments/aiBannerSectionFragment";
import { WHY_ADDACT_FIELDS, type Whyaddact } from "../fragments/whyAddactFragment";
export type { Whyaddact, GlobalCard2 } from "../fragments/whyAddactFragment";
import { OUR_INSIGHTS_TITLE_FIELDS, type OurInshightsTitle } from "../fragments/ourInsightsTitleFragment";
export type { OurInshightsTitle, OurInsightsTitle } from "../fragments/ourInsightsTitleFragment";
import { QA_SLUG_OUR_SERVICE_FIELDS } from "../fragments/qaSlugOurServiceFragment";
export type { QaSlugOurServiceType } from "../fragments/qaSlugOurServiceFragment";
import { type OurServiceList } from "../fragments/qaTestingListingFragment";
export type { OurServiceList, ServiceListItem } from "../fragments/qaTestingListingFragment";
import { SEO_FIELDS, type SeoType as SEO } from "../fragments/seoFragment";
export type { SEO };

const qaTestingSupportSlugQuery = gql`
  ${HEADING_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${OUR_SERVICE_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
  query QATestingDetails($filters: QaTestingDetailFiltersInput) {
    qaTestingDetails(filters: $filters) {
      SEO { ${SEO_FIELDS} }
      ${WHY_ADDACT_FIELDS}
      industry { ${INDUSTRY_FIELDS} }

      ${AI_BANNER_SECTION_FIELDS}

      ${QA_SLUG_OUR_SERVICE_FIELDS}

      cta { ${CTA_FIELDS} }
      techStack { ${TECH_STACK_FIELDS} }

      ourprocess { ${OUR_PROCESS_FIELDS} }

      faq { ${FAQ_FIELDS} }
      ${OUR_INSIGHTS_TITLE_FIELDS}
    }
  }
`;

export interface QATestingDetailResponse {
  qaTestingDetails: QATestingDetail[];
}



export interface QATestingDetail {
  SEO: SEO | null;
  industry: Industry;
  Banner: BannerSection;
  ourService: OurServiceList[];
  techStack: TechStack;
  cta: CTA | null;
  ourprocess: OurProcess;
  whyaddact: Whyaddact | null;
  faq: FAQ;
  ourInshightsTitle?: OurInshightsTitle | null;
}
















// Fetch function
export async function getQATestingSupportSlug(slug: string): Promise<QATestingDetail | null> {
  const data = await client.request<QATestingDetailResponse>(qaTestingSupportSlugQuery, {
    filters: {
      Slug: {
        eq: `/${slug}`,
      },
    },
  });

  return data.qaTestingDetails?.[0] ?? null;
}
