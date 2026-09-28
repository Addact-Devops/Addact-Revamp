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
import {
  BANNER_IMAGE_LINK_FIELDS,
  type ComponentBannerItem as ServiceDetailHeroBanner,
} from "../fragments/componentBannerFieldsFragment";
export type { ServiceDetailHeroBanner };
import {
  SERVICE_DETAIL_OUR_SERVICE_FIELDS,
  type OurServiceData,
} from "../fragments/serviceDetailOurServiceFragment";
export type { OurServiceData };
import {
  SERVICE_DETAIL_WHY_ADDACT_FIELDS,
  type WhyAddact,
} from "../fragments/serviceDetailWhyAddactFragment";
export type { WhyAddact };
import { CTA_FIELDS, type CTA2 } from "../fragments/ctaFragment";
export type { CTA2 };
import { type CONTACTUS } from "../fragments/homeContactUsFragment";
export type { CONTACTUS };
import { type OurProcessData } from "../fragments/ourProcessFragment";
export type { OurProcessData };
import { CONTACT_US_FORM_FIELDS } from "../fragments/contactUsFormFragment";

export type ServiceDetailContactUsItem = Partial<CONTACTUS>;

export type ServiceDetailContactUsType = {
  contact_us?: ServiceDetailContactUsItem;
};
import client from "../client";

const ServiceDetailBySlug = gql`
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${HEADING_FRAGMENT}
  ${RICHTEXT_FRAGMENT}
  query SubServicePages($filters: SubServicePageFiltersInput) {
    subServicePages(filters: $filters) {
      ReferenceTitle
      HeroBanner {
        ${BANNER_IMAGE_LINK_FIELDS}
      }
      ${SERVICE_DETAIL_OUR_SERVICE_FIELDS}
      our_process { ${OUR_PROCESS_FIELDS} }
      ${SERVICE_DETAIL_WHY_ADDACT_FIELDS}
      cta2 { ${CTA_FIELDS} }
      cta { ${CTA_FIELDS} }
      faq { ${FAQ_FIELDS} }
      contact_us {
          ${CONTACT_US_FORM_FIELDS}
        }
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
