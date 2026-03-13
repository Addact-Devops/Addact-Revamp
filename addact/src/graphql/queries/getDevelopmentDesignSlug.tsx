import { gql } from "graphql-request";
import client from "../client";
import { Heading, Image, Link } from "./getHomePage";

const developmentDesignSlugQuery = gql`
  query DevelopmentDesignSlug(
    $filters: DevelopmentAndDesignDetailFiltersInput
  ) {
    developmentAndDesignDetails(filters: $filters) {
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

      ourService {
        ... on ComponentHomeCmsListing {
          id
          serviceTitle
          serviceList {
            listingContext {
              id
              title
              description
              image {
                alternativeText
                url
                width
                height
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

          isCarousel
        }
        ... on ComponentHomeServiceList {
          id
          serviceTitle
          serviceList {
            listingContext {
              id
              title
              description
              image {
                alternativeText
                url
                width
                height
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
          isCarousel
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

      ourprocess {
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
        ProcessData {
          ... on ComponentBaseTemplateTitleWithDescription {
            id
            Title
            Description
          }
        }
      }
    }
  }
`;

export interface DevelopmentDesignSlugResponse {
  developmentAndDesignDetails: DevelopmentDesignDetail[];
}

export interface DevelopmentDesignDetail {
  SEO: SEO | null;
  Banner: BannerSection;
  cta: CTA | null;
  whyaddact: Whyaddact | null;
  faq: FAQ;
  techStack: TechStack;
  ourService: OurServiceList[];
  industry: Industry;
  ourprocess: OurProcess;
}

export interface OurServiceList {
  id: string;
  isCarousel: boolean;
  serviceTitle: string;
  serviceList: ServiceListItem[];
}

export interface ServiceListItem {
  listingContext: {
    id: string;
    title: string;
    description: string;
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
  };
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

export interface OurProcess {
  Title: Heading[];
  ProcessData: ProcessDataItem[];
}

export interface ProcessDataItem {
  id: string;
  Title: string;
  Description: string;
}

// Fetch function
export async function getDevelopmentDesignSlug(
  slug: string,
): Promise<DevelopmentDesignDetail | null> {
  const data = await client.request<DevelopmentDesignSlugResponse>(
    developmentDesignSlugQuery,
    {
      filters: {
        Slug: {
          eq: `/${slug}`,
        },
      },
    },
  );

  return data.developmentAndDesignDetails?.[0] ?? null;
}
