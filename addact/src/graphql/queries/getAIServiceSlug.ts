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
import { OUR_PROCESS_FIELDS, type OurProcess } from "../fragments/ourProcessFragment";
export type { OurProcess };
import { type AIBenefit } from "../fragments/developmentDesignListingFragment";
import { LISTING_CONTEXT_FIELDS } from "../fragments/aiListingContextFragment";
import {
  AI_SOLVE_PROBLEM_FIELDS,
  type AISolveProblem,
} from "./getAIService";
export type { AISolveProblem };
import {
  TECH_STACK_FIELDS,
  type TechStack,
  type Tab,
  type TabContent,
} from "../fragments/techStackFragment";
export type { TechStack, Tab, TabContent };
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { OUR_SERVICE_FRAGMENT, OUR_SERVICE_FIELDS, type OurServiceType as OurService } from "../fragments/ourServiceFragment";
export type { OurService };
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

const aiServiceSlugQuery = gql`
  ${HEADING_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${OUR_SERVICE_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
  query AiSolveProblem($filters: AiServicesDetailFiltersInput) {
    aiServicesDetails(filters: $filters) {
      SEO { ${SEO_FIELDS} }
      Banner {
        Banner {
          ${COMPONENT_BANNER_FIELDS}
        }
      }
      cta { ${CTA_FIELDS} }

      faq { ${FAQ_FIELDS} }

      ${OUR_INSIGHTS_TITLE_FIELDS}

      ${WHY_ADDACT_FIELDS}
      techStack { ${TECH_STACK_FIELDS} }

      aiSolveProblem { ${AI_SOLVE_PROBLEM_FIELDS} }

      aiBenefit {
        title
        serviceList {
          ${LISTING_CONTEXT_FIELDS}
        }
      }

      ${OUR_SERVICE_FIELDS}

      ourprocess { ${OUR_PROCESS_FIELDS} }
      industry { ${INDUSTRY_FIELDS} }
    }
  }
`;

export interface AIServiceResponse {
  aiServicesDetails?: AIService[];
  aiService?: AIService;
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
  ourService: OurService | OurService[] | null;
  ourprocess?: OurProcess | null;
  our_process?: OurProcess | null;
  industry: Industry | null;
}

// Fetch function
export async function getAIServiceSlug(slug: string): Promise<AIService | null> {
  const data = await client.request<AIServiceResponse>(aiServiceSlugQuery, {
    filters: {
      Slug: {
        eq: `/${slug}`,
      },
    },
  });

  return data.aiServicesDetails?.[0] ?? data.aiService ?? null;
}

