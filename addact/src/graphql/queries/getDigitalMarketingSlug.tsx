import { FAQ_FIELDS, type FAQ } from "../fragments/faqFragment";
export type { FAQ };
import { gql } from "graphql-request";
import { HEADING_FRAGMENT } from "../fragments/headingFragment";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { CTA_FIELDS, type CTA } from "../fragments/ctaFragment";
export type { CTA };
import {
  INDUSTRY_FIELDS,
  type Industry,
  type IndustryListItem,
} from "../fragments/industryFragment";
export type { Industry, IndustryListItem };
import {
  OUR_PROCESS_FIELDS,
  type OurProcess,
  type ProcessDataItem,
  type LinkProps,
} from "../fragments/ourProcessFragment";
export type { OurProcess, ProcessDataItem, LinkProps };
import {
  TECH_STACK_FIELDS,
  type TechStack,
  type Tab,
  type TabContent,
} from "../fragments/techStackFragment";
export type { TechStack, Tab, TabContent };
import { UI_UX_LISTING_FRAGMENT } from "../fragments/uiUxListingFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { OUR_SERVICE_FRAGMENT } from "../fragments/ourServiceFragment";
import {
  BANNER_SECTION_FIELDS,
  type BannerSection,
  type BannerItem,
  type BannerLink,
} from "../fragments/bannerSectionFragment";
export type { BannerSection, BannerItem, BannerLink };
import {
  WHY_ADDACT_FIELDS,
  type Whyaddact,
  type GlobalCard2,
} from "../fragments/whyAddactFragment";
export type { Whyaddact, GlobalCard2 };
import {
  OUR_INSIGHTS_TITLE_FIELDS,
  type OurInshightsTitle,
  type OurInsightsTitle,
} from "../fragments/ourInsightsTitleFragment";
export type { OurInshightsTitle, OurInsightsTitle };
import { DM_SLUG_OUR_SERVICE_FIELDS } from "../fragments/dmSlugOurServiceFragment";
import {
  CHALLENGES_FIELDS,
  type Challenges,
  type ChallengeError,
  type ChallengeProcessDataItem,
} from "../fragments/challengesFragment";
export type { Challenges, ChallengeError, ChallengeProcessDataItem };
import {
  DESIGN_FLOW_FIELDS,
  type DesignFlow,
  type DesignFlowTab,
  type DesignFlowItem,
} from "../fragments/designFlowFragment";
export type { DesignFlow, DesignFlowTab, DesignFlowItem };
import { IMPACT_UX_FIELDS, type ImpactUx } from "../fragments/impactUxFragment";
export type { ImpactUx };
import {
  OUR_WORK_FIELDS,
  type OurWork,
  type OurWorkServiceListItem,
} from "../fragments/ourWorkFragment";
export type { OurWork, OurWorkServiceListItem };
import { SEO_FIELDS, type SEO } from "../fragments/seoFragment";
export type { SEO };
import type { OurServiceList, ServiceListItem } from "../fragments/developmentDesignListingFragment";
export type { OurServiceList, ServiceListItem };
import client from "../client";
import type { Image, Link } from "@/types/common";

const digitalMarketingQuerySlugQuery = gql`
  ${HEADING_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${OUR_SERVICE_FRAGMENT}
  ${UI_UX_LISTING_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
  query DigitalMarketingDetails($filters: DigitalMarketingDetailFiltersInput) {
    digitalMarketingDetails(filters: $filters) {
      SEO { ${SEO_FIELDS} }
      isUxpage

      ${BANNER_SECTION_FIELDS}
      cta { ${CTA_FIELDS} }

      ${WHY_ADDACT_FIELDS}
      faq { ${FAQ_FIELDS} }

      ${OUR_INSIGHTS_TITLE_FIELDS}

      techStack { ${TECH_STACK_FIELDS} }

      ${DM_SLUG_OUR_SERVICE_FIELDS}

      industry { ${INDUSTRY_FIELDS} }

      ourprocess { ${OUR_PROCESS_FIELDS} }

      ${CHALLENGES_FIELDS}

      ${DESIGN_FLOW_FIELDS}

      ${IMPACT_UX_FIELDS}

      ${OUR_WORK_FIELDS}
    }
  }
`;

export interface DigitalMarketingResponse {
  digitalMarketingDetails: DigitalMarketingService[];
}

export interface DigitalMarketingService {
  SEO: SEO | null;
  Banner: BannerSection;
  isUxpage?: boolean | null;
  cta: CTA | null;
  whyaddact: Whyaddact | null;
  faq: FAQ;
  ourInshightsTitle?: OurInshightsTitle | null;
  techStack: TechStack;
  ourService: OurServiceList[];
  industry: Industry | null;
  our_service?: OurServiceData;
  ourprocess: OurProcess;
  challenges?: Challenges | null;
  designFlow?: DesignFlow | null;
  impactUx?: ImpactUx | null;
  ourWork?: OurWork | null;
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
      Image?: Image;
      Link?: Link;
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
      Link?: Link;
    }[];
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  };
}













// Fetch function
export async function getDigitalMarketingSlug(
  slug: string,
): Promise<DigitalMarketingService | null> {
  const data = await client.request<DigitalMarketingResponse>(digitalMarketingQuerySlugQuery, {
    filters: {
      Slug: {
        eq: `/${slug}`,
      },
    },
  });

  return data.digitalMarketingDetails?.[0] ?? null;
}
