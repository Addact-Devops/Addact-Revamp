import { FAQ_FIELDS } from "../fragments/faqFragment";
import { gql } from "graphql-request";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HEADING_FRAGMENT } from "../fragments/headingFragment";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { CTA_FIELDS } from "../fragments/ctaFragment";
import { OUR_PROCESS_FIELDS } from "../fragments/ourProcessFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { SEO_FIELDS } from "../fragments/seoFragment";
import { SERVICE_LIST_BANNER_FIELDS } from "../fragments/serviceListBannerFragment";
import { SERVICE_LIST_CTA2_FIELDS } from "../fragments/serviceListCta2Fragment";
import { SERVICE_LIST_WHY_ADDACT_FIELDS } from "../fragments/serviceListWhyAddactFragment";
import { SERVICE_LIST_OUR_SERVICE_FIELDS } from "../fragments/serviceListOurServiceFragment";
import { SERVICE_LIST_CONTACT_US_FIELDS } from "../fragments/serviceListContactUsFragment";
import client from "../client";
import { Heading, Image, Link } from "./getHomePage";

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
  Banner: {
    Banner: {
      BannerDescription: string;
      BannerTitle: string;
      BannerImage: {
        alternativeText: string | null;
        height: number;
        name: string;
        url: string;
        width: number;
      };
      BannerLink: {
        id: string;
        href: string;
        label: string;
        target: string;
        isExternal: boolean;
      };
    }[];
  };
  cta: {
    CTADescription?: string | null;
    CTAImage: {
      Image: {
        alternativeText: string | null;
        height: number;
        name: string;
        url: string;
        width: number;
      };
    }[];
    CTALink: {
      href: string;
      id: string;
      isExternal: boolean;
      label: string;
      target: string;
    }[];
    Title: Heading[];
  };
  cta2: CTA2;
  our_process: OurProcessData;
  why_addact: WhyAddact;
  faq: {
    Title: string;
    FAQ: {
      id?: string;
      Title: string;
      Description: string;
    }[];
  };
  our_service: OurServiceData;
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
      id?: string; // optional to support both with and without id
      h2: string;
    }[];
  };

  ReferenceTitle: string;

  team_feature: {
    documentId?: string;
    ReferenceTitle?: string; // optional, not in first version
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

export interface WhyAddact {
  Title: {
    id?: string;
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    h6?: string;
  }[];

  GlobalCard: {
    id?: string;
    Title: string;
    Description: string;
    Image: {
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
    } | null;
  }[];

  pageReference?: string;
}

export interface CTA2 {
  CTADescription: {
    type: string;
    children: {
      text: string;
      type: string;
    }[];
  }[];
  CTAImage: {
    Image: {
      alternativeText: string | null;
      height: number;
      name: string;
      url: string;
      width: number;
    };
  }[];
  CTALink: {
    href: string;
    id: string;
    isExternal: boolean;
    label: string;
    target: string;
  }[];
  Title: {
    id: string;
    h2: string;
  }[];
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
