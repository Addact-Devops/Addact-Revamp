import { gql } from "graphql-request";
import client from "../client";

const GET_HOME_PAGE = gql`
  query Home {
    home {
      documentId
      PageHeading {
        ... on ComponentBaseTemplateBaseHeading {
          PageTitle
          Slug
        }
      }
      cta {
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
        CTAImage {
          ... on ComponentSharedImage {
            Image {
              alternativeText
              height
              name
              url
              width
            }
            id
          }
        }
        CTALink {
          ... on ComponentSharedLink {
            id
            href
            label
            target
            isExternal
          }
        }
        pageReference
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
      banner {
        Banner {
          ... on ComponentBannerBanner {
            BannerDescription
            BannerImage {
              alternativeText
              height
              name
              url
              width
            }
            BannerLink {
              href
              id
              isExternal
              label
              target
            }
            BannerTitle
          }
        }
      }
      ourservices {
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
            Link {
              href
              isExternal
              label
              id
              target
            }
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
        }
        documentId
        pageReference
      }
      contactus {
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
        RecipientEmails
        pageReference
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
      GlobeAnimation {
        Title
        Locations
        Video {
          alternativeText
          url
          name
          width
          height
        }
      }
      animationBanner {
        animationTitle
        firstAnimationImage {
          alternativeText
          height
          url
          width
        }
        secondAnimationImage {
          alternativeText
          height
          url
          width
        }
        bannerTitle
        bannerDescription
        bannerSubTitle {
          Title
        }
        bannerImage {
          alternativeText
          height
          url
          width
        }
        bannerLink {
          Icon {
            alternativeText
            height
            url
            width
          }
          SubDisc
          href
          id
          isExternal
          label
          target
        }
      }

      ourCapabilitiy {
        heading
        capabilities {
          title
          description
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
          image {
            alternativeText
            height
            url
            width
          }
          sublinks {
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

      aiEcoSystem {
        AIEcoSystem {
          title
          description
          tagLine
          firstImage {
            alternativeText
            height
            url
            width
          }
          secondImage {
            alternativeText
            height
            url
            width
          }
          firstLayerlogos {
            tooltip
            Image {
              alternativeText
              height
              url
              width
            }
          }
          secondLayerlogos {
            tooltip
            Image {
              alternativeText
              height
              url
              width
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

      whoarewe {
        Counter {
          ... on ComponentCounterCounter {
            CounterTitle
            NumberCount
            id
          }
        }
        Title {
          ... on ComponentBaseTemplateTitleWithDescription {
            Description
            Title
          }
        }
        pageReference
      }
    }
  }
`;

// Reusable types
export interface Image {
  alternativeText: string | null;
  height: number;
  name?: string;
  url: string;
  width: number;
}

export interface Link {
  id: string;
  href: string;
  label: string | null;
  target?: string | null;
  isExternal: boolean;
  SubDisc?: string | null;
  Icon?: Image | null;
}

export interface Heading {
  id?: string;
  h1?: string;
  h2?: string;
  h3?: string;
  h4?: string;
  h5?: string;
  h6?: string;
}

export interface CTA {
  Title: Heading[];
  CTAImage: {
    Image: Image;
    id?: string;
  }[];
  CTALink: Link[];
  pageReference?: string;
}

export interface BANNER {
  Banner: {
    BannerTitle: string;
    BannerDescription: string;
    BannerImage: Image;
    BannerLink: Link;
  }[];
}

export interface OURSERVICES {
  Title: Heading[];
  GlobalCard: {
    id: string;
    Title: string;
    Description: string;
    Image: Image;
    Link: Link;
  }[];
  documentId: string;
  pageReference: string;
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

export interface Faq {
  Title: string;
  FAQ: {
    Description: string;
    Title: string;
    id?: string;
  }[];
}
export interface GloabeAnimation {
  Title: string;
  Locations: string;
  Video: Image;
}

export interface OurProcessData {
  Title: Heading[];
  ProcessData: {
    id: string;
    Title: string;
    Description: string;
  }[];
}

export interface AnimationBanner {
  animationTitle: string;
  firstAnimationImage: Image;
  secondAnimationImage: Image;
  bannerTitle: string;
  bannerDescription: string;
  bannerSubTitle: {
    Title: string;
  }[];
  bannerImage: Image;
  bannerLink: {
    Icon: Image | null;
    SubDisc: string | null;
    href: string;
    id: string;
    isExternal: boolean;
    label: string;
    target: string;
  };
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

export interface Capability {
  title: string;
  description: string;
  link: LinkWithIcon;
  image: Image;
  sublinks: LinkWithIcon[];
}

export interface OurCapabilitiy {
  heading: string;
  capabilities: Capability[];
}

export interface LogoLayer {
  tooltip?: string | null;
  Image: Image;
}

export interface AIEcoSystemData {
  title: string;
  description: string;
  tagLine: string;
  firstImage: Image;
  secondImage: Image;
  firstLayerlogos: LogoLayer[];
  secondLayerlogos: LogoLayer[];
}

export interface AIEcoSystem {
  AIEcoSystem: AIEcoSystemData;
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
    link: LinkWithIcon | null;
  } | null;
}

// Main interface
export interface HomeItems {
  documentId: string;
  PageHeading?: {
    PageTitle: string;
    Slug: string;
  }[];
  pageHeading: {
    PageTitle: string;
    Slug: string;
  }[];
  cta: CTA;
  banner: BANNER;
  ourprocess: OurProcessData;
  ourservices: OURSERVICES;
  contactus: CONTACTUS;
  whyaddact: Whyaddact;
  faq: Faq;
  GlobeAnimation: GloabeAnimation;
  animationBanner: AnimationBanner;
  ourCapabilitiy: OurCapabilitiy;
  aiEcoSystem: AIEcoSystem;
  industry?: Industry;
  whoarewe: {
    Counter: {
      CounterTitle: string;
      NumberCount: number;
      id: string;
    }[];
    Title: {
      Description: string;
      Title: string;
    }[];
    pageReference: string;
  };
}

export interface HomeResponse {
  home: HomeItems;
}

export interface HomeProps {
  data: HomeResponse;
}

export async function getHOmePageData(): Promise<HomeResponse> {
  const data = await client.request<HomeResponse>(GET_HOME_PAGE);
  return data;
}
