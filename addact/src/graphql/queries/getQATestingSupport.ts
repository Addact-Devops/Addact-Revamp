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
import { QA_TESTING_LISTING_FRAGMENT } from "../fragments/qaTestingListingFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { Heading, Link } from "./getHomePage";

const GET_PRESS_RELEASE_LIST_PAGE = gql`
  ${HEADING_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${QA_TESTING_LISTING_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
  query QATesting {
    qaTestingAndSupport {
      SEO {
        metaTitle
        metaDescription
        ogTitle
        ogDescription
        ogImage {
          url
        }
        metaRobots
        twitterCardTitle
        canonicalURL
        structuredData
        languageTag
      }

      industry { ${INDUSTRY_FIELDS} }
      whyaddact {
        Title {
          ... on ComponentHeadingsH1 {
            id
            h1
          }
          ... on ComponentHeadingsH2 {
            id
            h2
          }
          ... on ComponentHeadingsH3 {
            id
            h3
          }
          ... on ComponentHeadingsH4 {
            id
            h5
          }
          ... on ComponentHeadingsH5 {
            id
            h5
          }
          ... on ComponentHeadingsH6 {
            id
            h6
          }
        }
        pageReference
        GlobalCard {
          ... on ComponentBaseTemplatePromo {
            id
            Title
            Description
            Image {
              alternativeText
              height
              name
              url
              width
            }
            Link {
              id
              href
              label
              target
              isExternal
            }
          }
        }
      }

      Banner {
        Banner {
          ... on ComponentBannerBanner {
            BannerTitle
            BannerDescription
            BannerLogo {
              alternativeText
              height
              url
              width
            }
            BannerImage {
              alternativeText
              height
              url
              width
            }
            isTextAlignCenter
            isVideo
            show_searchbox
            videoLink
            BannerLink {
              id
              href
              label
              target
              isExternal
              SubDisc
              Icon {
                alternativeText
                height
                url
                width
              }
            }
          }
        }
      }

      ourService {
        ... on ComponentHomeQaTestingListing { ...QaTestingListingFields }
      }

      cta { ${CTA_FIELDS}
  ${FAQ_FIELDS} }
      faq { ${FAQ_FIELDS} }
      techStack { ${TECH_STACK_FIELDS} }
      ourprocess { ${OUR_PROCESS_FIELDS} }
      ourInshightsTitle {
        CommonTitle {
          ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
        }
      }
    }
  }
`;

export interface QATestingSupportResponse {
  qaTestingAndSupport: QATestingSupport;
}

export interface QATestingSupport {
  SEO: SEO | null;
  industry: Industry;
  Banner: BannerSection;
  ourService: OurServiceList[];
  cta: CTA | null;
  techStack: TechStack;
  ourprocess: OurProcess;
  faq: FAQ;
  whyaddact: Whyaddact | null;
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

export async function getQATestingSupport(): Promise<QATestingSupport> {
  const data = await client.request<QATestingSupportResponse>(GET_PRESS_RELEASE_LIST_PAGE);
  return data.qaTestingAndSupport;
}
