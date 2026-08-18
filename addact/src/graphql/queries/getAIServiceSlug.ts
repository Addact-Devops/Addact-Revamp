import { FAQ_FIELDS } from "../fragments/faqFragment";
import { gql } from "graphql-request";
import { HEADING_FRAGMENT } from "../fragments/headingFragment";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { CTA_FIELDS } from "../fragments/ctaFragment";
import { INDUSTRY_FIELDS } from "../fragments/industryFragment";
import { OUR_PROCESS_FIELDS } from "../fragments/ourProcessFragment";
import { AI_BENEFIT_FIELDS } from "../fragments/aiBenefitFragment";
import { AI_SOLVE_PROBLEM_FIELDS } from "../fragments/aiSolveProblemFragment";
import { TECH_STACK_FIELDS } from "../fragments/techStackFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { OUR_SERVICE_FRAGMENT } from "../fragments/ourServiceFragment";
import client from "../client";
import { Heading, Image, Link } from "./getHomePage";

const aiServiceSlugQuery = gql`
  ${HEADING_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${OUR_SERVICE_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
  query AiSolveProblem($filters: AiServicesDetailFiltersInput) {
    aiServicesDetails(filters: $filters) {
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
      cta { ${CTA_FIELDS} }

      faq { ${FAQ_FIELDS} }

      ourInshightsTitle {
        CommonTitle {
          ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
        }
      }

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
      techStack { ${TECH_STACK_FIELDS} }

      aiSolveProblem { ${AI_SOLVE_PROBLEM_FIELDS} }

      aiBenefit { ${AI_BENEFIT_FIELDS} }

      ourService {
        ... on ComponentHomeServiceList { ...OurServiceFields }
      }

      ourprocess { ${OUR_PROCESS_FIELDS} }
      industry { ${INDUSTRY_FIELDS} }
    }
  }
`;

export interface AIServiceResponse {
  aiServicesDetails?: AIService[];
  aiService?: AIService;
}

export interface AIService {
  SEO: SEO | null;
  Banner: BannerSection;
  cta: CTA | null;
  faq: FAQ;
  whyaddact: Whyaddact | null;
  ourInshightsTitle?: OurInshightsTitle | null;
  techStack: TechStack;
  aiSolveProblem: AISolveProblem | null;
  aiBenefit: AIBenefit | null;
  ourService: OurService | OurService[] | null;
  ourprocess?: OurProcess | null;
  our_process?: OurProcess | null;
  industry: Industry | null;
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
export interface GraphQLErrorItem {
  code?: string;
  message?: string;
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
  BannerLink: LinkWithIcon;
}

export interface LinkWithIcon {
  id: string;
  href: string;
  label: string | null;
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

export interface AISolveProblem {
  title: string;
  aiSolveProblemList: {
    list: {
      title: string;
      image: Image;
      bgImage: Image;
    }[];
  }[];
}

export interface AIBenefit {
  title: string;
  serviceList: {
    listingContext: {
      title: string;
      description: string;
      image: Image;
      link: LinkWithIcon;
    };
  }[];
}

export interface OurService {
  isCarousel: boolean;
  serviceTitle: string;

  serviceVariant: {
    variant: string;
  } | null;
  serviceList: {
    listingContext: {
      title: string;
      description: string;
      image: Image;
      link: Link;
    };
    serviceDescription?: string | null;
    serviceLink?: LinkWithIcon | null;
  }[];
}
export interface OurProcess {
  Title: (Heading | GraphQLErrorItem)[];
  ProcessData: {
    Title: string;
    Description: string;
    Link: LinkWithIcon;
  }[];
}

// Fetch function
export async function getAIServiceSlug(slug: string): Promise<AIService | null> {
  const data = await client.request<AIServiceResponse>(aiServiceSlugQuery, {
    filters: {
      Slug: {
        eq: `/${slug}`,
      },
    },
  });

  return data.aiServicesDetails?.[0] ?? data.aiService ?? null;
}
