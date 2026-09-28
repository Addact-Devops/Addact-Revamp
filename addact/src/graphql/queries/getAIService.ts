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
import { OUR_PROCESS_FIELDS, type OurProcess } from "../fragments/ourProcessFragment";
export type { OurProcess };
import {
  AI_SERVICE_LIST_FIELDS,
  type AIBenefit,
  type ServiceListItem,
} from "../fragments/aiServiceListFragment";
export type { AIBenefit };
import {
  LISTING_CONTEXT_FIELDS,
  type AIListingContext,
} from "../fragments/aiListingContextFragment";
import { type Image } from "@/types/common";

// Inlined AI Solve Problem fields & types (used in 2 places)
export const AI_SOLVE_PROBLEM_FIELDS = `
  title
  aiSolveProblemList {
    list {
      title
      image {
        ...ImageFields
      }
      bgImage {
        ...ImageFields
      }
    }
  }
`;

export type AISolveProblem = {
  title: string;
  aiSolveProblemList: {
    list: {
      title: string;
      image: Image | null;
      bgImage: Image | null;
    };
  }[];
};

import {
  TECH_STACK_FIELDS,
  type TechStack,
  type Tab,
  type TabContent,
} from "../fragments/techStackFragment";
export type { TechStack, Tab, TabContent };

// Inlined AI Our Services fragment & fields (used only here)
export const AI_OUR_SERVICES_FRAGMENT = gql``;

export type OurService = {
  listingContext: AIListingContext;
  serviceList: ServiceListItem[];
};

import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import {
  COMPONENT_BANNER_FIELDS,
  type BannerSection,
  type ComponentBannerItem as BannerItem,
  type BannerLink,
} from "../fragments/componentBannerFieldsFragment";
import type { LinkWithIcon } from "../fragments/homeCapabilitiesFragment";
export type { BannerSection, BannerItem, BannerLink, LinkWithIcon };
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
import { SEO_FIELDS, type SEO } from "../fragments/seoFragment";
export type { SEO };
import client from "../client";

const aiServiceQuery = gql`
  ${HEADING_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  fragment AiOurServicesFields on ComponentHomeAiOurServices {
    ${LISTING_CONTEXT_FIELDS}
    ${AI_SERVICE_LIST_FIELDS}
  }
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
  query AiSolveProblem {
    aiService {
      SEO { ${SEO_FIELDS} }
      Banner {
        Banner {
          ${COMPONENT_BANNER_FIELDS}
        }
      }
      cta { ${CTA_FIELDS} }

      faq { ${FAQ_FIELDS} }
      ${WHY_ADDACT_FIELDS}

      ${OUR_INSIGHTS_TITLE_FIELDS}

      techStack { ${TECH_STACK_FIELDS} }

      aiSolveProblem { ${AI_SOLVE_PROBLEM_FIELDS} }

      aiBenefit {
        title
        ${AI_SERVICE_LIST_FIELDS}
      }

     ourService {
    ... on ComponentHomeAiOurServices { ...AiOurServicesFields }
  }

      ourprocess { ${OUR_PROCESS_FIELDS} }
      industry { ${INDUSTRY_FIELDS} }
    }
  }
`;

export interface AIServiceResponse {
  aiService: AIService;
}

export interface AIService {
  SEO: SEO | null;
  Banner: BannerSection;
  cta: CTA | null;
  faq: FAQ;
  whyaddact: Whyaddact | null;
  ourInshightsTitle?: OurInshightsTitle | null;
  techStack: TechStack;
  aiSolveProblem: AISolveProblem | null;
  aiBenefit: AIBenefit | null;
  ourService: OurService | null;
  ourprocess: OurProcess | null;
  industry: Industry | null;
}

// Fetch function
export async function getAIService(): Promise<AIService> {
  const data = await client.request<AIServiceResponse>(aiServiceQuery);

  return data.aiService;
}
