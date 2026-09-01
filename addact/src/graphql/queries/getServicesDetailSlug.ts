import { FAQ_FIELDS } from "../fragments/faqFragment";
import { gql } from "graphql-request";
import { HEADING_FRAGMENT } from "../fragments/headingFragment";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { CTA_FIELDS } from "../fragments/ctaFragment";
import { INDUSTRY_FIELDS } from "../fragments/industryFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { OUR_SERVICE_FRAGMENT } from "../fragments/ourServiceFragment";
import { SEO_FIELDS } from "../fragments/seoFragment";
import { SERVICES_DETAIL_BANNER_FIELDS } from "../fragments/servicesDetailBannerFragment";
import { WHY_ADDACT_FIELDS } from "../fragments/whyAddactFragment";
import { OUR_INSIGHTS_TITLE_FIELDS } from "../fragments/ourInsightsTitleFragment";
import { SERVICES_DETAIL_PROCESS_FIELDS } from "../fragments/servicesDetailProcessFragment";
import client from "../client";
import { Heading, Image, Link } from "./getHomePage";

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

export interface OurInshightsTitle {
  CommonTitle: {
    Title: string;
    Description: string;
    Link: {
      id: string;
      href: string;
      label: string;
      target: string;
      isExternal: boolean;
      SubDisc: string | null;
      Icon: { alternativeText: string | null; height: number; url: string; width: number } | null;
    };
  }[];
}

export interface SEO {
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: {
    url: string;
  } | null;
  metaRobots: string;
  twitterCardTitle: string;
  canonicalURL: string;
  structuredData: string | null;
  languageTag: string;
}

export interface BannerSection {
  Banner: BannerItem[];
}

export interface BannerItem {
  BannerTitle: string;
  BannerDescription: string;
  BannerLogo: Image | null;
  BannerImage: Image | null;
  isTextAlignCenter: boolean | null;
  isVideo: boolean | null;
  show_searchbox: boolean;
  videoLink: string | null;
  BannerLink: BannerLink;
}

export interface BannerLink {
  id: string;
  href: string;
  label: string;
  target: string;
  isExternal: boolean;
  SubDisc: string | null;
  Icon: Image | null;
}

export interface CTA {
  CTADescription: string;
  pageReference: string;
  CTAImage: {
    Image: Image;
  }[];
  CTALink: Link[];
  Title: Heading[];
}

export interface Whyaddact {
  Title: Heading[];
  pageReference?: string;
  GlobalCard: GlobalCard2[];
}

export interface GlobalCard2 {
  id?: string;
  Title: string;
  Description: string;
  Image: Image;
  Link?: Link | null;
}

export interface FAQ {
  Title: string;
  FAQ: {
    id: string;
    Title: string;
    Description: string;
  }[];
}

export interface Industry {
  industryListTitle: string;
  industry_list: IndustryListItem[];
}

export interface IndustryListItem {
  Slug: string;
  listingContext: {
    title: string;
    description: string;
    image: Image | null;
    link: {
      id: string;
      href: string;
      label: string | null;
      isExternal: boolean;
      SubDisc: string | null;
      Icon: Image | null;
    } | null;
  } | null;
}

export interface OurServiceList {
  id: string;
  isCarousel: boolean | null;
  serviceTitle: string | null;
  serviceVariant: {
    variant: string;
  } | null;
  serviceList: ServiceListItem[];
}

export interface ServiceListItem {
  listingContext: {
    id: string;
    title: string | null;
    description: string | null;
    image: Image | null;
    link: {
      id: string;
      href: string;
      label: string;
      target: string;
      isExternal: boolean;
      SubDisc: string | null;
      Icon: Image | null;
    } | null;
  } | null;
}

export interface OurProcess {
  Title: Heading[];
  ProcessData: ProcessDataItem[];
  link: LinkProps;
}

export interface LinkProps {
  id: string;
  href: string;
  label: string;
  target: string;
  isExternal: boolean;
  SubDisc: string | null;
  Icon: Image | null;
}

export interface ProcessDataItem {
  id: string;
  Title: string;
  Description: string;
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
