import { FAQ_FIELDS, type FAQ } from "../fragments/faqFragment";
export type { FAQ };
import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HEADING_FRAGMENT } from "../fragments/headingFragment";
import { OUR_PROCESS_FIELDS } from "../fragments/ourProcessFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import { SEO_FIELDS, type SeoType as SEO } from "../fragments/seoFragment";
export type { SEO };
import { SERVICE_DETAIL_HERO_BANNER_FIELDS, type ServiceDetailHeroBanner } from "../fragments/serviceDetailHeroBannerFragment";
export type { ServiceDetailHeroBanner };
import { SERVICE_DETAIL_OUR_SERVICE_FIELDS, type OurServiceData } from "../fragments/serviceDetailOurServiceFragment";
export type { OurServiceData };
import { SERVICE_DETAIL_WHY_ADDACT_FIELDS, type WhyAddact } from "../fragments/serviceDetailWhyAddactFragment";
export type { WhyAddact };
import { SERVICE_DETAIL_CTA_FIELDS, type CTA2 } from "../fragments/serviceDetailCtaFragment";
export type { CTA2 };
import { SERVICE_DETAIL_CONTACT_US_FIELDS, type CONTACTUS } from "../fragments/serviceDetailContactUsFragment";
export type { CONTACTUS };
import { type OurProcessData } from "../fragments/servicesDetailProcessFragment";
export type { OurProcessData };
import client from "../client";

const ServiceDetailBySlug = gql`
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${HEADING_FRAGMENT}
  ${RICHTEXT_FRAGMENT}
  query SubServicePages($filters: SubServicePageFiltersInput) {
    subServicePages(filters: $filters) {
      ReferenceTitle
      ${SERVICE_DETAIL_HERO_BANNER_FIELDS}
      ${SERVICE_DETAIL_OUR_SERVICE_FIELDS}
      our_process { ${OUR_PROCESS_FIELDS} }
      ${SERVICE_DETAIL_WHY_ADDACT_FIELDS}
      cta2 { ${SERVICE_DETAIL_CTA_FIELDS} }
      cta { ${SERVICE_DETAIL_CTA_FIELDS} }
      faq { ${FAQ_FIELDS} }
      ${SERVICE_DETAIL_CONTACT_US_FIELDS}
      SEO {
        ${SEO_FIELDS}
      }
    }
  }
`;

export interface ServiceDetailResponse {
  subServicePages: SubServicePage[];
}

export interface SubServicePage {
  ReferenceTitle: string;
  SEO?: SEO | null;
  HeroBanner: ServiceDetailHeroBanner;
  our_process: OurProcessData;
  our_service: OurServiceData;
  why_addact: WhyAddact;
  cta2: CTA2;
  cta: null;
  faq: FAQ;
  contact_us: CONTACTUS;
}

// Fetch function
export async function getServiceDetailBySlug(slug: string): Promise<SubServicePage> {
  const data = await client.request<ServiceDetailResponse>(ServiceDetailBySlug, {
    filters: {
      Slug: {
        eq: `/${slug}`,
      },
    },
  });

  return data.subServicePages?.[0];
}
