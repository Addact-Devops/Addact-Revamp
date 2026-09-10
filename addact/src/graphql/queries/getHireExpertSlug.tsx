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
import { HIRE_SLUG_OUR_SERVICE_FIELDS } from "../fragments/hireSlugOurServiceFragment";
export type { HireSlugOurServiceType } from "../fragments/hireSlugOurServiceFragment";
import { SEO_FIELDS, type SEO } from "../fragments/seoFragment";
import type { Image } from "@/types/common";
import { type OurServiceList } from "../fragments/qaTestingListingFragment";
export type { OurServiceList, ServiceListItem } from "../fragments/qaTestingListingFragment";
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

export interface LinkWithIcon {
  id: string;
  href: string;
  label: string | null;
  target?: string | null;
  isExternal: boolean;
  SubDisc: string | null;
  Icon: Image | null;
}



export interface OurServiceData {
  Titeldescription?: {
    Description: string;
    Title: string;
  }[];

  FirstTabDisplayName: string;
  SecondTabDisplayName: string;

  ForEnterprisesBrands: {
    GlobalCard: {
      id: string;
      Title: string;
      Description: string;
      Image?: {
        alternativeText: string | null;
        height: number;
        name: string;
        url: string;
        width: number;
      };
      Link?: {
        id: string;
        href: string;
        label: string;
        target: string;
        isExternal: boolean;
      };
      sub_service_page?: {
        Slug: string;
      };
    }[];

    Title: {
      id?: string;
      h2: string;
    }[];
  };

  ReferenceTitle: string;

  team_feature: {
    documentId?: string;
    ReferenceTitle?: string;
    Description: string;
    Cards: {
      id: string;
      Title: string;
      Description: string;
      Link?: {
        id: string;
        href: string;
        label: string;
        target: string;
        isExternal: boolean;
      };
    }[];
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  };
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
