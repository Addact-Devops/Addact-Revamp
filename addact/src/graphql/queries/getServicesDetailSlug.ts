import { gql } from "graphql-request";
import client from "../client";
import { HireExpert } from "./getHireExpertSlug";

const servicesDetailSlugQuery = gql`
  query ServicesDetailSlug($filters: ServicesDetailFiltersInput) {
    servicesDetails(filters: $filters) {
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
      Banner: banner {
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

      our_process: ourProcess {
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
    }
  }
`;

export interface ServicesDetailResponse {
  servicesDetails: HireExpert[];
}

export async function getServicesDetailSlug(slug: string): Promise<HireExpert | null> {
  const data = await client.request<ServicesDetailResponse>(servicesDetailSlugQuery, {
    filters: {
      slug: {
        eq: `/${slug}`,
      },
    },
  });

  return data.servicesDetails?.[0] ?? null;
}
