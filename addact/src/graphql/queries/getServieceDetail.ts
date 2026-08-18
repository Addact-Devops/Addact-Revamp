import { FAQ_FIELDS } from "../fragments/faqFragment";
import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HEADING_FRAGMENT } from "../fragments/headingFragment";
import { OUR_PROCESS_FIELDS } from "../fragments/ourProcessFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
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
      HeroBanner {
        BannerTitle
        BannerDescription
        BannerImage {
          alternativeText
          height
          name
          url
          width
        }
        BannerLink {
          id
          href
          label
          isExternal
        }
      }
      our_service {
        Titeldescription {
          Description
          Title
        }
        FirstTabDisplayName
        SecondTabDisplayName
        ForEnterprisesBrands {
          GlobalCard {
            ... on ComponentBaseTemplatePromo {
              Description
              Title
              id
            }
          }
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
            ... on ComponentBaseTemplateRichtext { ...RichtextFields }
          }
        }
        ReferenceTitle
        team_feature {
          Cards {
            Description
            Title
            id
            Link {
              id
              href
              label
              target
              isExternal
            }
          }
          Description
        }
      }
      our_process { ${OUR_PROCESS_FIELDS} }
      why_addact {
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
          ... on ComponentBaseTemplateRichtext { ...RichtextFields }
          ... on Error {
            code
            message
          }
        }
        GlobalCard {
          ... on ComponentBaseTemplatePromo {
            Description
            Image {
              alternativeText
              height
              name
              url
              width
            }
            Title
          }
        }
      }
      cta2 {
        CTADescription
        CTAImage {
          alternativeText
          height
          name
          url
          width
        }
        CTALink {
          id
          href
          label
          isExternal
        }
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
      }
      cta {
        CTADescription
        CTAImage {
          alternativeText
          height
          name
          url
          width
        }
        CTALink {
          id
          href
          label
          isExternal
        }
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
      }
      faq { ${FAQ_FIELDS} }
      contact_us {
        Form {
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
        pageReference
        RecipientEmails
      }
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
