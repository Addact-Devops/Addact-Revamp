import { gql } from "graphql-request";
import { HEADING_FRAGMENT } from "../fragments/headingFragment";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { OUR_SERVICE_FRAGMENT } from "../fragments/ourServiceFragment";
import { SEO_FIELDS, type SeoType as SEO } from "../fragments/seoFragment";
export type { SEO };
import { BANNER_SECTION_FIELDS, type BannerSection, type BannerItem, type BannerLink } from "../fragments/bannerSectionFragment";
export type { BannerSection, BannerItem, BannerLink };
import { CTA_FIELDS, type CTA } from "../fragments/ctaFragment";
export type { CTA };
import { WHY_ADDACT_FIELDS, type Whyaddact, type GlobalCard2 } from "../fragments/whyAddactFragment";
export type { Whyaddact, GlobalCard2 };
import { FAQ_FIELDS, type FAQ } from "../fragments/faqFragment";
export type { FAQ };
import { OUR_INSIGHTS_TITLE_FIELDS, type OurInshightsTitle, type OurInsightsTitle } from "../fragments/ourInsightsTitleFragment";
export type { OurInshightsTitle, OurInsightsTitle };
import { TECH_STACK_FIELDS, type TechStack, type Tab, type TabContent } from "../fragments/techStackFragment";
export type { TechStack, Tab, TabContent };
import { INDUSTRY_FIELDS, type Industry, type IndustryListItem } from "../fragments/industryFragment";
export type { Industry, IndustryListItem };
import { OUR_PROCESS_FIELDS, type OurProcess, type ProcessDataItem, type LinkProps } from "../fragments/ourProcessFragment";
export type { OurProcess, ProcessDataItem, LinkProps };
import type { OurServiceList, ServiceListItem } from "../fragments/developmentDesignListingFragment";
export type { OurServiceList, ServiceListItem };
import client from "../client";

const developmentDesignDetailsSlugQuery = gql`
  ${HEADING_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${OUR_SERVICE_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
  query SitecoreDetails($filters: SitecoreDetailFiltersInput) {
    sitecoreDetails(filters: $filters) {
      SEO {
        ${SEO_FIELDS}
      }
      ${BANNER_SECTION_FIELDS}
      cta {
        ${CTA_FIELDS}
      }
      ${WHY_ADDACT_FIELDS}
      faq {
        ${FAQ_FIELDS}
      }
      ${OUR_INSIGHTS_TITLE_FIELDS}
      techStack {
        ${TECH_STACK_FIELDS}
      }
      ourService {
        ... on ComponentHomeServiceList {
          ...OurServiceFields
        }
      }
      industry {
        ${INDUSTRY_FIELDS}
      }
      ourprocess {
        ${OUR_PROCESS_FIELDS}
      }
    }
  }
`;

export interface SitecoreDetailResponse {
  sitecoreDetails: SitecoreDetail[];
}

export interface SitecoreDetail {
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
export async function getDevelopmentDesignDetailsSitecoreSlug(
  slug: string,
): Promise<SitecoreDetail | null> {
  const data = await client.request<SitecoreDetailResponse>(developmentDesignDetailsSlugQuery, {
    filters: {
      Slug: {
        eq: `/${slug}`,
      },
    },
  });

  return data.sitecoreDetails?.[0] ?? null;
}

