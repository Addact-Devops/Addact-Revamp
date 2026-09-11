import { FAQ_FIELDS, type FAQ } from "../fragments/faqFragment";
export type { FAQ } from "../fragments/faqFragment";
import { gql } from "graphql-request";
import { HEADING_FRAGMENT } from "../fragments/headingFragment";
import { SEO_FIELDS, type SeoType as SEO } from "../fragments/seoFragment";
export type { SEO };
import { WHY_WORK_WITH_US_FIELDS, type Whyaddact } from "../fragments/whyWorkWithUsFragment";
export type { Whyaddact, GlobalCard2 } from "../fragments/whyWorkWithUsFragment";
import {
  DEVELOPMENT_HERO_BANNER_FIELDS,
  type BannerSection,
} from "../fragments/developmentHeroBannerFragment";
export type {
  BannerSection,
  BannerItem,
  BannerLink,
} from "../fragments/developmentHeroBannerFragment";
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
import {
  DEVELOPMENT_DESIGN_LISTING_FRAGMENT,
  type OurServiceList,
} from "../fragments/developmentDesignListingFragment";
export type {
  OurServiceList,
  ServiceListItem,
} from "../fragments/developmentDesignListingFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { OUR_SERVICE_FRAGMENT } from "../fragments/ourServiceFragment";
import {
  OUR_INSIGHTS_TITLE_FIELDS,
  type OurInshightsTitle,
} from "../fragments/ourInsightsTitleFragment";
export type { OurInshightsTitle, OurInsightsTitle } from "../fragments/ourInsightsTitleFragment";
import { DEVELOPMENT_OUR_SERVICE_FIELDS } from "../fragments/developmentOurServiceFragment";
export type { DevelopmentOurServiceType } from "../fragments/developmentOurServiceFragment";
import client from "../client";

const developementDesignQuery = gql`
  ${HEADING_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${OUR_SERVICE_FRAGMENT}
  ${DEVELOPMENT_DESIGN_LISTING_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
  query DevelopmentDesign {
    developmentAndDesign {
      SEO { ${SEO_FIELDS} }
      Banner { ${DEVELOPMENT_HERO_BANNER_FIELDS} }
      cta { ${CTA_FIELDS} }

      whyaddact { ${WHY_WORK_WITH_US_FIELDS} }
      faq { ${FAQ_FIELDS} }

      ${OUR_INSIGHTS_TITLE_FIELDS}

      techStack { ${TECH_STACK_FIELDS} }

      ${DEVELOPMENT_OUR_SERVICE_FIELDS}

      industry { ${INDUSTRY_FIELDS} }

      ourprocess { ${OUR_PROCESS_FIELDS} }
    }
  }
`;

export interface DevelopmentDesignResponse {
  developmentAndDesign: DevelopmentDesign;
}

export interface DevelopmentDesign {
  SEO: SEO | null;
  Banner: BannerSection;
  cta: CTA | null;
  whyaddact: Whyaddact | null;
  faq: FAQ;
  ourInshightsTitle?: OurInshightsTitle | null;
  techStack: TechStack;
  ourService: OurServiceList[];
  industry: Industry;
  ourprocess: OurProcess;
}

// Fetch function
export async function getDevelopmentDesign(): Promise<DevelopmentDesign> {
  const data = await client.request<DevelopmentDesignResponse>(developementDesignQuery);

  return data.developmentAndDesign;
}
