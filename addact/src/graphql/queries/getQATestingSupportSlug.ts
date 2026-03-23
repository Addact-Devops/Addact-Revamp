import { Image } from "@/types/common";
import client from "../client";
import { gql } from "graphql-request";
import { Heading, Link } from "./getHomePage";

const qaTestingSupportSlugQuery = gql`
  query QATestingDetails($filters: QaTestingDetailFiltersInput) {
    qaTestingDetails(filters: $filters) {
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
        ... on ComponentHomeServiceList {
          id
          serviceTitle
          serviceVariant {
            variant
          }
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
        link {
          id
          href
          label
          target
          isExternal
          SubDisc
          Icon {
            alternativeText
            width
            url
            height
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

export interface QATestingDetailResponse {
  qaTestingDetails: QATestingDetail[];
}

export interface QATestingDetail {
  SEO: SEO | null;
  industry: Industry;
  Banner: BannerSection;
  ourService: OurServiceList[];
  cta: CTA | null;
  ourprocess: OurProcess;
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
export async function getQATestingSupportSlug(
  slug: string,
): Promise<QATestingDetail | null> {
  const data = await client.request<QATestingDetailResponse>(
    qaTestingSupportSlugQuery,
    {
      filters: {
        Slug: {
          eq: `/${slug}`,
        },
      },
    },
  );

  return data.qaTestingDetails?.[0] ?? null;
}
