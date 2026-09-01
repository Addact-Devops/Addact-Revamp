import { gql } from "graphql-request";
import { HEADING_FRAGMENT } from "../fragments/headingFragment";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { BASE_HEADING_FRAGMENT } from "../fragments/baseHeadingFragment";
import { HOME_BANNER_FRAGMENT } from "../fragments/homeBannerFragment";
import { HOME_SERVICES_FRAGMENT } from "../fragments/homeServicesFragment";
import { HOME_CONTACT_US_FRAGMENT } from "../fragments/homeContactUsFragment";
import { HOME_WHY_ADDACT_FRAGMENT } from "../fragments/homeWhyAddactFragment";
import { HOME_GLOBE_ANIMATION_FRAGMENT } from "../fragments/homeGlobeAnimationFragment";
import { HOME_ANIMATION_BANNER_FRAGMENT } from "../fragments/homeAnimationBannerFragment";
import { HOME_CAPABILITIES_FRAGMENT } from "../fragments/homeCapabilitiesFragment";
import { HOME_AI_ECO_SYSTEM_FRAGMENT } from "../fragments/homeAiEcoSystemFragment";
import { HOME_WHO_ARE_WE_FRAGMENT } from "../fragments/homeWhoAreWeFragment";
import { CTA_FIELDS } from "../fragments/ctaFragment";
import { OUR_PROCESS_FIELDS } from "../fragments/ourProcessFragment";
import { INDUSTRY_FIELDS } from "../fragments/industryFragment";
import client from "../client";

const GET_HOME_PAGE = gql`
  ${HEADING_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
  ${BASE_HEADING_FRAGMENT}
  ${HOME_BANNER_FRAGMENT}
  ${HOME_SERVICES_FRAGMENT}
  ${HOME_CONTACT_US_FRAGMENT}
  ${HOME_WHY_ADDACT_FRAGMENT}
  ${HOME_GLOBE_ANIMATION_FRAGMENT}
  ${HOME_ANIMATION_BANNER_FRAGMENT}
  ${HOME_CAPABILITIES_FRAGMENT}
  ${HOME_AI_ECO_SYSTEM_FRAGMENT}
  ${HOME_WHO_ARE_WE_FRAGMENT}
  query Home {
    home {
      documentId
      PageHeading {
        ... on ComponentBaseTemplateBaseHeading {
          ...BaseHeadingFields
        }
      }
      cta {
        ${CTA_FIELDS}
      }
      ourprocess {
        ${OUR_PROCESS_FIELDS}
      }
      ...HomeBannerFields
      ...HomeServicesFields
      ...HomeContactUsFields
      ...HomeWhyAddactFields
      ...HomeGlobeAnimationFields
      ...HomeAnimationBannerFields
      ...HomeCapabilitiesFields
      ...HomeAiEcoSystemFields
      industry {
        ${INDUSTRY_FIELDS}
      }
      ...HomeWhoAreWeFields
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
