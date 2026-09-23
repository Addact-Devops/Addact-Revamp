import { FAQ_FIELDS, type FAQ } from "../fragments/faqFragment";
export type { FAQ };
import { gql } from "graphql-request";
import { HEADING_FRAGMENT } from "../fragments/headingFragment";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { CTA_FIELDS, type CTA } from "../fragments/ctaFragment";
export type { CTA };
import { INDUSTRY_FIELDS, type Industry, type IndustryListItem } from "../fragments/industryFragment";
export type { Industry, IndustryListItem };
import { OUR_PROCESS_FIELDS, type OurProcess, type ProcessDataItem, type LinkProps } from "../fragments/ourProcessFragment";
export type { OurProcess, ProcessDataItem, LinkProps };
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { type TechStack } from "../fragments/techStackFragment";
export type { TechStack, Tab, TabContent } from "../fragments/techStackFragment";
import { OUR_SERVICE_FRAGMENT } from "../fragments/ourServiceFragment";
import { AI_BANNER_SECTION_FIELDS, type BannerSection } from "../fragments/aiBannerSectionFragment";
export type { BannerSection, BannerItem, BannerLink } from "../fragments/aiBannerSectionFragment";
import { WHY_ADDACT_FIELDS, type Whyaddact } from "../fragments/whyAddactFragment";
export type { Whyaddact, GlobalCard2 } from "../fragments/whyAddactFragment";
import {
  OUR_INSIGHTS_TITLE_FIELDS,
  type OurInshightsTitle,
} from "../fragments/ourInsightsTitleFragment";
export type { OurInshightsTitle, OurInsightsTitle } from "../fragments/ourInsightsTitleFragment";
import { HIRE_SLUG_OUR_SERVICE_FIELDS, type HireSlugOurServiceType, type OurServiceData } from "../fragments/hireSlugOurServiceFragment";
export type { HireSlugOurServiceType, OurServiceData };
import { SEO_FIELDS, type SEO } from "../fragments/seoFragment";
export type { SEO };
import { type OurServiceList } from "../fragments/qaTestingListingFragment";
export type { OurServiceList, ServiceListItem } from "../fragments/qaTestingListingFragment";
import { type LinkWithIcon } from "../fragments/homeCapabilitiesFragment";
export type { LinkWithIcon };
import client from "../client";

const hireExpertsSlugQuery = gql`
  ${HEADING_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${OUR_SERVICE_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
  query HireExpertSlug($filters: HireExpertDetailFiltersInput) {
    hireExpertDetails(filters: $filters) {
      SEO { ${SEO_FIELDS} }
      ${AI_BANNER_SECTION_FIELDS}
      cta { ${CTA_FIELDS} }

      ${WHY_ADDACT_FIELDS}
      faq { ${FAQ_FIELDS} }

      ${OUR_INSIGHTS_TITLE_FIELDS}

      industry { ${INDUSTRY_FIELDS} }

      ${HIRE_SLUG_OUR_SERVICE_FIELDS}

      our_process { ${OUR_PROCESS_FIELDS} }
    }
  }
`;

export interface HireExpertResponse {
  hireExpertDetails: HireExpert[];
}

export interface HireExpert {
  SEO: SEO | null;
  Banner: BannerSection;
  cta: CTA | null;
  whyaddact: Whyaddact | null;
  faq: FAQ;
  ourInshightsTitle?: OurInshightsTitle | null;
  techStack: TechStack;
  ourService: OurServiceList[];
  our_service?: OurServiceData;
  industry: Industry | null;
  our_process?: OurProcess | null;
}








// Fetch function
export async function getHireExpertsSlug(slug: string): Promise<HireExpert | null> {
  const data = await client.request<HireExpertResponse>(hireExpertsSlugQuery, {
    filters: {
      Slug: {
        eq: `/${slug}`,
      },
    },
  });

  return data.hireExpertDetails?.[0] ?? null;
}
