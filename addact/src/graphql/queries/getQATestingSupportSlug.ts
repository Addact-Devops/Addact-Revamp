import { FAQ_FIELDS } from "../fragments/faqFragment";
import { Image } from "@/types/common";
import client from "../client";
import { gql } from "graphql-request";
import { HEADING_FRAGMENT } from "../fragments/headingFragment";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { CTA_FIELDS } from "../fragments/ctaFragment";
import { INDUSTRY_FIELDS } from "../fragments/industryFragment";
import { OUR_PROCESS_FIELDS } from "../fragments/ourProcessFragment";
import { TECH_STACK_FIELDS } from "../fragments/techStackFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { OUR_SERVICE_FRAGMENT } from "../fragments/ourServiceFragment";
import { AI_BANNER_SECTION_FIELDS } from "../fragments/aiBannerSectionFragment";
import { WHY_ADDACT_FIELDS } from "../fragments/whyAddactFragment";
import { OUR_INSIGHTS_TITLE_FIELDS } from "../fragments/ourInsightsTitleFragment";
import { QA_SLUG_OUR_SERVICE_FIELDS } from "../fragments/qaSlugOurServiceFragment";
import { SEO_FIELDS } from "../fragments/seoFragment";
import { Heading, Link } from "./getHomePage";

const qaTestingSupportSlugQuery = gql`
  ${HEADING_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${OUR_SERVICE_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
  query QATestingDetails($filters: QaTestingDetailFiltersInput) {
    qaTestingDetails(filters: $filters) {
      SEO { ${SEO_FIELDS} }
      ${WHY_ADDACT_FIELDS}
      industry { ${INDUSTRY_FIELDS} }

      ${AI_BANNER_SECTION_FIELDS}

      ${QA_SLUG_OUR_SERVICE_FIELDS}

      cta { ${CTA_FIELDS} }
      techStack { ${TECH_STACK_FIELDS} }

      ourprocess { ${OUR_PROCESS_FIELDS} }

      faq { ${FAQ_FIELDS} }
      ${OUR_INSIGHTS_TITLE_FIELDS}
    }
  }
`;

export interface QATestingDetailResponse {
  qaTestingDetails: QATestingDetail[];
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

export interface QATestingDetail {
  SEO: SEO | null;
  industry: Industry;
  Banner: BannerSection;
  ourService: OurServiceList[];
  techStack: TechStack;
  cta: CTA | null;
  ourprocess: OurProcess;
  whyaddact: Whyaddact | null;
  faq: FAQ;
  ourInshightsTitle?: OurInshightsTitle | null;
}
export interface FAQ {
  Title: string;
  FAQ: {
    id: string;
    Title: string;
    Description: string;
  }[];
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

export interface TechStack {
  title: string;
  description: string;
  tab: Tab[];
}
export interface Tab {
  category: {
    categoryTitle: string;
  };
  tabContent: TabContent[];
}
export interface TabContent {
  title: string;
  logo: Image | null;
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
      label: string;
      isExternal: boolean;
      SubDisc: string | null;
      Icon: Image | null;
    } | null;
  } | null;
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
  BannerLink: BannerLink | null;
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

export interface CTA {
  CTADescription: string;
  pageReference: string;
  CTAImage: {
    Image: Image;
  }[];
  CTALink: Link[];
  Title: Heading[];
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

export interface OurProcess {
  Title: Heading[];
  ProcessData: ProcessDataItem[];
  link: LinkProps;
}

export interface ProcessDataItem {
  id: string;
  Title: string;
  Description: string;
}
export interface ProcessDataItem {
  id: string;
  Title: string;
  Description: string;
}

// Fetch function
export async function getQATestingSupportSlug(slug: string): Promise<QATestingDetail | null> {
  const data = await client.request<QATestingDetailResponse>(qaTestingSupportSlugQuery, {
    filters: {
      Slug: {
        eq: `/${slug}`,
      },
    },
  });

  return data.qaTestingDetails?.[0] ?? null;
}
