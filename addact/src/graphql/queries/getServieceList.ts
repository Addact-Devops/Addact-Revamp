import { FAQ_FIELDS, type FAQ } from "../fragments/faqFragment";
export type { FAQ };
import { gql } from "graphql-request";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HEADING_FRAGMENT } from "../fragments/headingFragment";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { CTA_FIELDS, type CTA } from "../fragments/ctaFragment";
export type { CTA };
import { OUR_PROCESS_FIELDS } from "../fragments/ourProcessFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { SEO_FIELDS, type SeoType as SEO } from "../fragments/seoFragment";
export type { SEO };
import { SERVICE_LIST_BANNER_FIELDS, type ServiceListBannerType } from "../fragments/serviceListBannerFragment";
export type { ServiceListBannerType };
import { SERVICE_LIST_CTA2_FIELDS, type CTA2 } from "../fragments/serviceListCta2Fragment";
export type { CTA2 };
import { SERVICE_LIST_WHY_ADDACT_FIELDS, type WhyAddact } from "../fragments/serviceListWhyAddactFragment";
export type { WhyAddact };
import { SERVICE_LIST_OUR_SERVICE_FIELDS } from "../fragments/serviceListOurServiceFragment";
import { type OurServiceData } from "../fragments/serviceDetailOurServiceFragment";
export type { OurServiceData };
import { SERVICE_LIST_CONTACT_US_FIELDS } from "../fragments/serviceListContactUsFragment";
import { type CONTACTUS } from "../fragments/serviceDetailContactUsFragment";
export type { CONTACTUS };
import { type OurProcessData } from "../fragments/servicesDetailProcessFragment";
export type { OurProcessData };
import client from "../client";

const ServiceListBySlug = gql`
  ${LINK_FRAGMENT}
  ${HEADING_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${SHARED_IMAGE_FRAGMENT}
  query ServiceLists($filters: ServiceListFiltersInput) {
    serviceLists(filters: $filters) {
      ReferenceTitle
      SEO {
        ${SEO_FIELDS}
      }
      ${SERVICE_LIST_BANNER_FIELDS}
      cta { 
        ${CTA_FIELDS}
      }
      faq { ${FAQ_FIELDS} }
      ${SERVICE_LIST_CTA2_FIELDS}
      our_process { ${OUR_PROCESS_FIELDS} }
      ${SERVICE_LIST_WHY_ADDACT_FIELDS}
      ${SERVICE_LIST_OUR_SERVICE_FIELDS}
      ${SERVICE_LIST_CONTACT_US_FIELDS}
    }
  }
`;

export interface ServiceListResponse {
  serviceLists: ServiceList[];
}

export interface ServiceList {
  ReferenceTitle: string;
  SEO?: SEO | null;
  Banner: ServiceListBannerType["Banner"];
  cta: CTA;
  cta2: CTA2;
  our_process: OurProcessData;
  why_addact: WhyAddact;
  faq: FAQ;
  our_service: OurServiceData;
  contact_us: CONTACTUS;
}

// Fetch function
export async function getServiceListBySlug(slug: string): Promise<ServiceList> {
  const data = await client.request<ServiceListResponse>(ServiceListBySlug, {
    filters: {
      Slug: {
        eq: `/${slug}`,
      },
    },
  });

  return data.serviceLists?.[0];
}
