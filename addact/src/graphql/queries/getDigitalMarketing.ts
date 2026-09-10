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
import { DIGITAL_MARKETING_LISTING_FRAGMENT, type OurServiceList } from "../fragments/digitalMarketingListingFragment";
export type { OurServiceList, ServiceListItem } from "../fragments/digitalMarketingListingFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { OUR_SERVICE_FRAGMENT } from "../fragments/ourServiceFragment";
import { AI_BANNER_SECTION_FIELDS, type BannerSection } from "../fragments/aiBannerSectionFragment";
export type { BannerSection, BannerItem, BannerLink } from "../fragments/aiBannerSectionFragment";
import { WHY_ADDACT_FIELDS, type Whyaddact } from "../fragments/whyAddactFragment";
export type { Whyaddact, GlobalCard2 } from "../fragments/whyAddactFragment";
import { OUR_INSIGHTS_TITLE_FIELDS, type OurInshightsTitle } from "../fragments/ourInsightsTitleFragment";
export type { OurInshightsTitle, OurInsightsTitle } from "../fragments/ourInsightsTitleFragment";
import { DM_OUR_SERVICE_FIELDS } from "../fragments/dmOurServiceFragment";
import { SEO_FIELDS } from "../fragments/seoFragment";
import { DM_WHO_ARE_WE_FIELDS, type DigitalMarketingWhoAreWeData } from "../fragments/digitalMarketingWhoAreWeFragment";
import client from "../client";

const digitalMarketingQuery = gql`
  ${HEADING_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${OUR_SERVICE_FRAGMENT}
  ${DIGITAL_MARKETING_LISTING_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
  query DigitalMarketingLanding {
    digitalMarketingService {
      SEO { ${SEO_FIELDS} }
      ${AI_BANNER_SECTION_FIELDS}
      cta { ${CTA_FIELDS} }

      ${WHY_ADDACT_FIELDS}
      faq { ${FAQ_FIELDS} }

      ${OUR_INSIGHTS_TITLE_FIELDS}

      techStack { ${TECH_STACK_FIELDS} }

      ${DM_OUR_SERVICE_FIELDS}

      industry { ${INDUSTRY_FIELDS} }

      ourprocess { ${OUR_PROCESS_FIELDS} }

      ${DM_WHO_ARE_WE_FIELDS}
    }
  }
`;

export interface DigitalMarketingResponse {
  digitalMarketingService: DigitalMarketingService;
}

export interface DigitalMarketingService {
  SEO: SEO | null;
  Banner: BannerSection;
  cta: CTA | null;
  whyaddact: Whyaddact | null;
  faq: FAQ;
  ourInshightsTitle?: OurInshightsTitle | null;
  techStack: TechStack;
  ourService: OurServiceList[];
  industry: Industry | null;
  ourprocess: OurProcess;
  whoarewe: DigitalMarketingWhoAreWeData;
}


export interface SEO {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: {
    url: string;
  } | null;
  metaRobots: string;
  twitterCardTitle: string;
  canonicalURL: string;
  structuredData: string | null;
  languageTag: string;
}

// Fetch function
export async function getDigitalMarketing(): Promise<DigitalMarketingService> {
  const data = await client.request<DigitalMarketingResponse>(digitalMarketingQuery);

  return data.digitalMarketingService;
}
