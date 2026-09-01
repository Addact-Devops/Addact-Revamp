import { FAQ_FIELDS } from "../fragments/faqFragment";
import { gql } from "graphql-request";
import { HEADING_FRAGMENT } from "../fragments/headingFragment";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { CTA_FIELDS } from "../fragments/ctaFragment";
import { INDUSTRY_FIELDS } from "../fragments/industryFragment";
import { OUR_PROCESS_FIELDS } from "../fragments/ourProcessFragment";
import { TECH_STACK_FIELDS } from "../fragments/techStackFragment";
import { UI_UX_LISTING_FRAGMENT } from "../fragments/uiUxListingFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { OUR_SERVICE_FRAGMENT } from "../fragments/ourServiceFragment";
import { BANNER_SECTION_FIELDS } from "../fragments/bannerSectionFragment";
import { WHY_ADDACT_FIELDS } from "../fragments/whyAddactFragment";
import { OUR_INSIGHTS_TITLE_FIELDS } from "../fragments/ourInsightsTitleFragment";
import { DM_SLUG_OUR_SERVICE_FIELDS } from "../fragments/dmSlugOurServiceFragment";
import { CHALLENGES_FIELDS } from "../fragments/challengesFragment";
import { DESIGN_FLOW_FIELDS } from "../fragments/designFlowFragment";
import { IMPACT_UX_FIELDS } from "../fragments/impactUxFragment";
import { OUR_WORK_FIELDS } from "../fragments/ourWorkFragment";
import { SEO_FIELDS } from "../fragments/seoFragment";
import client from "../client";
import { Heading, Image, Link } from "./getHomePage";

const digitalMarketingQuerySlugQuery = gql`
  ${HEADING_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${OUR_SERVICE_FRAGMENT}
  ${UI_UX_LISTING_FRAGMENT}
  ${TITLE_WITH_DESCRIPTION_FRAGMENT}
  query DigitalMarketingDetails($filters: DigitalMarketingDetailFiltersInput) {
    digitalMarketingDetails(filters: $filters) {
      SEO { ${SEO_FIELDS} }
      isUxpage

      ${BANNER_SECTION_FIELDS}
      cta { ${CTA_FIELDS} }

      ${WHY_ADDACT_FIELDS}
      faq { ${FAQ_FIELDS} }

      ${OUR_INSIGHTS_TITLE_FIELDS}

      techStack { ${TECH_STACK_FIELDS} }

      ${DM_SLUG_OUR_SERVICE_FIELDS}

      industry { ${INDUSTRY_FIELDS} }

      ourprocess { ${OUR_PROCESS_FIELDS} }

      ${CHALLENGES_FIELDS}

      ${DESIGN_FLOW_FIELDS}

      ${IMPACT_UX_FIELDS}

      ${OUR_WORK_FIELDS}
    }
  }
`;

export interface DigitalMarketingResponse {
  digitalMarketingDetails: DigitalMarketingService[];
}

export interface DigitalMarketingService {
  SEO: SEO | null;
  Banner: BannerSection;
  isUxpage?: boolean | null;
  cta: CTA | null;
  whyaddact: Whyaddact | null;
  faq: FAQ;
  ourInshightsTitle?: OurInshightsTitle | null;
  techStack: TechStack;
  ourService: OurServiceList[];
  industry: Industry | null;
  our_service?: OurServiceData;
  ourprocess: OurProcess;
  challenges?: Challenges | null;
  designFlow?: DesignFlow | null;
  impactUx?: ImpactUx | null;
  ourWork?: OurWork | null;
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
      label: string | null;
      target?: string | null;
      isExternal: boolean;
      SubDisc: string | null;
      Icon: Image | null;
    } | null;
  } | null;
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
      Image?: Image;
      Link?: Link;
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
      Link?: Link;
    }[];
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
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
  chipsText: {
    Title: string;
  }[];
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

export interface Challenges {
  Title: (Heading | ChallengeError)[];
  ProcessData: ChallengeProcessDataItem[];
}

export interface ChallengeError {
  code: string;
  message: string;
}

export interface ChallengeProcessDataItem {
  Title: string;
  Description: string;
  Link: {
    id: string;
    href: string;
    label: string;
    target: string;
    isExternal: boolean;
    SubDisc: string | null;
    Icon: Image | null;
  } | null;
}

export interface DesignFlow {
  title: string;
  description: string;
  tabsAndFlow: DesignFlowTab[];
}

export interface DesignFlowTab {
  tabTitle: string;
  flow: DesignFlowItem[];
}

export interface DesignFlowItem {
  title: string;
  information: string;
  gif: Image | null;
  icon: Image | null;
}

export interface ImpactUx {
  title: string;
  beforeText: string;
  afterText: string;
  beforeImage: Image | null;
  afterImage: Image | null;
  desktopFrame: Image | null;
  mobileFrame: Image | null;
}

export interface OurWork {
  serviceTitle: string | null;
  serviceVariant: {
    variant: string;
  } | null;
  isCarousel: boolean | null;
  serviceList: OurWorkServiceListItem[];
}

export interface OurWorkServiceListItem {
  listingContext: {
    id: string;
    title: string | null;
    description: string | null;
    image: Image | null;
    link: {
      id: string;
      href: string;
      label: string | null;
      target: string;
      isExternal: boolean;
      SubDisc: string | null;
      Icon: Image | null;
    } | null;
  } | null;
  tagLine: {
    Title: string;
  }[];
}

// Fetch function
export async function getDigitalMarketingSlug(
  slug: string,
): Promise<DigitalMarketingService | null> {
  const data = await client.request<DigitalMarketingResponse>(digitalMarketingQuerySlugQuery, {
    filters: {
      Slug: {
        eq: `/${slug}`,
      },
    },
  });

  return data.digitalMarketingDetails?.[0] ?? null;
}
