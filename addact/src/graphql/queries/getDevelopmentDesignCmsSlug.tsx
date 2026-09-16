import { gql } from "graphql-request";
import { HEADING_FRAGMENT } from "../fragments/headingFragment";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { SITECORE_LISTING_FRAGMENT } from "../fragments/sitecoreListingFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { OUR_SERVICE_FRAGMENT } from "../fragments/ourServiceFragment";
import { CMS_DETAIL_ALL_FIELDS_FRAGMENT } from "../fragments/cmsDetailAllFieldsFragment";
import client from "../client";


import type { SeoType as SEO } from "../fragments/seoFragment";
import type { FAQ } from "../fragments/faqFragment";
import type { Whyaddact, GlobalCard2 } from "../fragments/whyWorkWithUsFragment";
import type { BannerSection, BannerItem, BannerLink } from "../fragments/developmentHeroBannerFragment";
import type { CTA } from "../fragments/ctaFragment";
import type { Industry, IndustryListItem } from "../fragments/industryFragment";
import type { OurProcess, ProcessDataItem, LinkProps } from "../fragments/ourProcessFragment";
import type { TechStack, Tab, TabContent } from "../fragments/techStackFragment";
import type { OurServiceList, ServiceListItem } from "../fragments/developmentDesignListingFragment";
import type { OurInshightsTitle, OurInsightsTitle } from "../fragments/ourInsightsTitleFragment";

export type {
  SEO,
  FAQ,
  Whyaddact,
  GlobalCard2,
  BannerSection,
  BannerItem,
  BannerLink,
  CTA,
  Industry,
  IndustryListItem,
  OurProcess,
  ProcessDataItem,
  LinkProps,
  TechStack,
  Tab,
  TabContent,
  OurServiceList,
  ServiceListItem,
  OurInshightsTitle,
  OurInsightsTitle,
};

const developmentDesignDetailsSlugQuery = gql`
  ${HEADING_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${OUR_SERVICE_FRAGMENT}
  ${SITECORE_LISTING_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
  ${CMS_DETAIL_ALL_FIELDS_FRAGMENT}
  query CMSDetails($filters: CmsDetailFiltersInput) {
    cmsDetails(filters: $filters) {
      ...CmsDetailAllFields
    }
  }
`;

export interface CmsDetailResponse {
  cmsDetails: CmsDetail[];
}

export interface CmsDetail {
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
export async function getDevelopmentDesignDetailsCmsSlug(slug: string): Promise<CmsDetail | null> {
  const data = await client.request<CmsDetailResponse>(developmentDesignDetailsSlugQuery, {
    filters: {
      Slug: {
        eq: `/${slug}`,
      },
    },
  });

  return data.cmsDetails?.[0] ?? null;
}
