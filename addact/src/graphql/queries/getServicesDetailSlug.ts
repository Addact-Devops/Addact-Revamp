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
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { OUR_SERVICE_FRAGMENT } from "../fragments/ourServiceFragment";
import { SEO_FIELDS, type SeoType as SEO } from "../fragments/seoFragment";
export type { SEO };
import { SERVICES_DETAIL_BANNER_FIELDS, type BannerSection } from "../fragments/servicesDetailBannerFragment";
export type { BannerSection, BannerItem, BannerLink } from "../fragments/servicesDetailBannerFragment";
import { WHY_ADDACT_FIELDS, type Whyaddact } from "../fragments/whyAddactFragment";
export type { Whyaddact, GlobalCard2 } from "../fragments/whyAddactFragment";
import { OUR_INSIGHTS_TITLE_FIELDS, type OurInshightsTitle } from "../fragments/ourInsightsTitleFragment";
export type { OurInshightsTitle, OurInsightsTitle } from "../fragments/ourInsightsTitleFragment";
import { type OurServiceList } from "../fragments/qaTestingListingFragment";
export type { OurServiceList, ServiceListItem } from "../fragments/qaTestingListingFragment";
import { SERVICES_DETAIL_PROCESS_FIELDS } from "../fragments/servicesDetailProcessFragment";
import { type OurProcess } from "../fragments/ourProcessFragment";
export type { OurProcess, ProcessDataItem, LinkProps } from "../fragments/ourProcessFragment";
import client from "../client";

const servicesDetailSlugQuery = gql`
  ${HEADING_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${OUR_SERVICE_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
  query ServicesDetailSlug($filters: ServicesDetailFiltersInput) {
    servicesDetails(filters: $filters) {
      SEO {
        ${SEO_FIELDS}
      }
      ${SERVICES_DETAIL_BANNER_FIELDS}
      cta { ${CTA_FIELDS} }

      ${WHY_ADDACT_FIELDS}
      faq { ${FAQ_FIELDS} }

      ${OUR_INSIGHTS_TITLE_FIELDS}

      industry { ${INDUSTRY_FIELDS} }

      ourService {
        ... on ComponentHomeServiceList { ...OurServiceFields }
      }

      ${SERVICES_DETAIL_PROCESS_FIELDS}
    }
  }
`;

export interface ServicesDetailResponse {
  servicesDetails: ServicesDetail[];
}

export interface ServicesDetail {
  SEO: SEO | null;
  Banner: BannerSection;
  cta: CTA | null;
  whyaddact: Whyaddact | null;
  faq: FAQ | null;
  ourInshightsTitle?: OurInshightsTitle | null;
  industry: Industry | null;
  ourService: OurServiceList[];
  our_process?: OurProcess | null;
}



















export async function getServicesDetailSlug(slug: string): Promise<ServicesDetail | null> {
  const data = await client.request<ServicesDetailResponse>(servicesDetailSlugQuery, {
    filters: {
      slug: {
        eq: `/${slug}`,
      },
    },
  });

  return data.servicesDetails?.[0] ?? null;
}
