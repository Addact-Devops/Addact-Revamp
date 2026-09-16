import { FAQ_FIELDS, type FAQ } from "../fragments/faqFragment";
export type { FAQ } from "../fragments/faqFragment";
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
import { HIRE_SERVICE_LIST_FRAGMENT, type OurServiceList } from "../fragments/hireServiceListFragment";
export type { OurServiceList, ServiceListItem } from "../fragments/hireServiceListFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { AI_BANNER_SECTION_FIELDS, type BannerSection } from "../fragments/aiBannerSectionFragment";
export type { BannerSection, BannerItem, BannerLink } from "../fragments/aiBannerSectionFragment";
import { WHY_ADDACT_FIELDS, type Whyaddact } from "../fragments/whyAddactFragment";
export type { Whyaddact, GlobalCard2 } from "../fragments/whyAddactFragment";
import { OUR_INSIGHTS_TITLE_FIELDS, type OurInshightsTitle } from "../fragments/ourInsightsTitleFragment";
export type { OurInshightsTitle, OurInsightsTitle } from "../fragments/ourInsightsTitleFragment";
import { HIRE_OUR_SERVICE_FIELDS } from "../fragments/hireOurServiceFragment";
export type { HireOurServiceType } from "../fragments/hireOurServiceFragment";
import { SEO_FIELDS, type SeoType as SEO } from "../fragments/seoFragment";
export type { SEO };
import client from "../client";

const hireExpertsQuery = gql`
  ${HEADING_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${HIRE_SERVICE_LIST_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
  query HireExpert {
    hireExpert {
      SEO { ${SEO_FIELDS} }
      ${AI_BANNER_SECTION_FIELDS}
      cta { ${CTA_FIELDS} }

      ${WHY_ADDACT_FIELDS}
      faq { ${FAQ_FIELDS} }

      ${OUR_INSIGHTS_TITLE_FIELDS}

      techStack { ${TECH_STACK_FIELDS} }

      industry { ${INDUSTRY_FIELDS} }

      ${HIRE_OUR_SERVICE_FIELDS}

      ourprocess { ${OUR_PROCESS_FIELDS} }
    }
  }
`;

export interface HireExpertResponse {
  hireExpert: HireExpert;
}

export interface HireExpert {
  SEO: SEO | null;
  Banner: BannerSection;
  cta: CTA | null;
  whyaddact: Whyaddact | null;
  faq: FAQ;
  ourInshightsTitle?: OurInshightsTitle | null;
  techStack: TechStack;
  industry: Industry | null;
  ourService: OurServiceList[];
  ourprocess: OurProcess | null;
}


// Fetch function
export async function getHireExperts(): Promise<HireExpert> {
  const data = await client.request<HireExpertResponse>(hireExpertsQuery);

  return data.hireExpert;
}
