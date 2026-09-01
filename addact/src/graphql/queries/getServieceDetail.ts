import { FAQ_FIELDS } from "../fragments/faqFragment";
import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HEADING_FRAGMENT } from "../fragments/headingFragment";
import { OUR_PROCESS_FIELDS } from "../fragments/ourProcessFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import { SEO_FIELDS } from "../fragments/seoFragment";
import { SERVICE_DETAIL_HERO_BANNER_FIELDS } from "../fragments/serviceDetailHeroBannerFragment";
import { SERVICE_DETAIL_OUR_SERVICE_FIELDS } from "../fragments/serviceDetailOurServiceFragment";
import { SERVICE_DETAIL_WHY_ADDACT_FIELDS } from "../fragments/serviceDetailWhyAddactFragment";
import { SERVICE_DETAIL_CTA_FIELDS } from "../fragments/serviceDetailCtaFragment";
import { SERVICE_DETAIL_CONTACT_US_FIELDS } from "../fragments/serviceDetailContactUsFragment";
import client from "../client";
import { Heading, Image, Link } from "./getHomePage";

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
  SEO?: {
    metaTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: {
      url?: string;
    };
    metaRobots?: string;
    twitterCardTitle?: string;
    canonicalURL?: string;
    structuredData?: Record<string, unknown>;
    languageTag?: string;
  } | null;
  HeroBanner: {
    BannerTitle: string;
    BannerDescription: string;
    BannerImage: Image;
    BannerLink: Link;
  };
  our_process: OurProcessData;
  our_service: OurServiceData;
  why_addact: WhyAddact;
  cta2: CTA2;
  cta: null;
  faq: {
    Title: string;
    FAQ: {
      id?: string;
      Title: string;
      Description: string;
    }[];
  };
  contact_us: CONTACTUS;
}

export interface OurProcessData {
  Title: Heading[];
  ProcessData: {
    id: string;
    Title: string;
    Description: string;
  }[];
}
export interface CONTACTUS {
  pageReference: string;
  RecipientEmails: string;
  Form: {
    id: string;
    Title: string;
    Description: string;
    Image: Image;
    Link: Link;
  }[];
}
export interface CTA2 {
  CTADescription: string;
  CTAImage: Image;
  CTALink: Link;
  Title: Heading[];
}

export interface WhyAddact {
  Title: Heading[];

  GlobalCard: {
    id?: string;
    Title: string;
    Description: string;
    Image: Image;
    Link?: Link | null;
  }[];

  pageReference?: string;
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
