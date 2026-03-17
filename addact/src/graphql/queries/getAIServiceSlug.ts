import { gql } from "graphql-request";
import client from "../client";
import { Heading, Image, Link } from "./getHomePage";

const aiServiceSlugQuery = gql`
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
      cta {
        CTADescription
        pageReference
        CTAImage {
          ... on ComponentSharedImage {
            Image {
              alternativeText
              height
              name
              url
              width
            }
          }
        }
        CTALink {
          ... on ComponentSharedLink {
            href
            id
            isExternal
            label
            target
          }
        }
        Title {
          ... on ComponentHeadingsH6 {
            id
            h6
          }
          ... on ComponentHeadingsH5 {
            id
            h5
          }
          ... on ComponentHeadingsH4 {
            id
            h5
          }
          ... on ComponentHeadingsH3 {
            id
            h3
          }
          ... on ComponentHeadingsH2 {
            id
            h2
          }
          ... on ComponentHeadingsH1 {
            id
            h1
          }
        }
      }

      faq {
        Title
        FAQ {
          Description
          Title
          id
        }
      }

      techStack {
        title
        description
        tab {
          category {
            categoryTitle
          }
          tabContent {
            title
            logo {
              alternativeText
              height
              url
              width
            }
          }
        }
      }

      aiSolveProblem {
        title
        aiSolveProblemList {
          list {
            title
            image {
              alternativeText
              height
              url
              width
            }
            bgImage {
              alternativeText
              url
              width
              height
            }
          }
        }
      }

      aiBenefit {
        title
        serviceList {
          listingContext {
            title
            description
            image {
              alternativeText
              height
              url
              width
            }
            link {
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
        ... on ComponentHomeAiOurServices {
          listingContext {
            title
            description
            image {
              alternativeText
              height
              url
              width
            }
            link {
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
          serviceList {
            listingContext {
              id
              title
              description
              image {
                alternativeText
                height
                url
                width
              }
              link {
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
      }

      ourprocess {
        Title {
          ... on ComponentHeadingsH6 {
            id
            h6
          }
          ... on ComponentHeadingsH5 {
            id
            h5
          }
          ... on ComponentHeadingsH4 {
            id
            h5
          }
          ... on ComponentHeadingsH3 {
            id
            h3
          }
          ... on ComponentHeadingsH2 {
            id
            h2
          }
          ... on ComponentHeadingsH1 {
            id
            h1
          }
          ... on Error {
            code
            message
          }
        }
        ProcessData {
          ... on ComponentBaseTemplateTitleWithDescription {
            Title
            Description
            Link {
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
      industry {
        industryListTitle
        industry_list {
          Slug
          listingContext {
            title
            description
            image {
              alternativeText
              height
              url
              width
            }
            link {
              id
              href
              label
              isExternal
              SubDisc
              Icon {
                alternativeText
                url
                width
                height
              }
            }
          }
        }
      }
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
  techStack: TechStack;
  aiSolveProblem: AISolveProblem | null;
  aiBenefit: AIBenefit | null;
  ourService: OurService | null;
  ourprocess?: OurProcess | null;
  our_process?: OurProcess | null;
  industry: Industry | null;
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
  listingContext: {
    title: string;
    description: string;
    image: Image;
    link: LinkWithIcon;
  };
  serviceList: {
    listingContext: {
      id: string;
      title: string;
      description: string;
      image: Image;
      link: LinkWithIcon;
    };
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
export async function getAIServiceSlug(
  slug: string,
): Promise<AIService | null> {
  const data = await client.request<AIServiceResponse>(aiServiceSlugQuery, {
    filters: {
      Slug: {
        eq: `/${slug}`,
      },
    },
  });

  return data.aiServicesDetails?.[0] ?? data.aiService ?? null;
}
