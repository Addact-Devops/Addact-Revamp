import { gql } from "graphql-request";
import { HEADING_FRAGMENT } from "../fragments/headingFragment";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { TITLE_WITH_DESCRIPTION_FRAGMENT } from "../fragments/titleWithDescriptionFragment";
import { BASE_HEADING_FRAGMENT, type BaseHeading } from "../fragments/baseHeadingFragment";
export type { BaseHeading };
import { HOME_BANNER_FRAGMENT, type BANNER } from "../fragments/homeBannerFragment";
import { HOME_SERVICES_FRAGMENT, type OURSERVICES } from "../fragments/homeServicesFragment";

export type { BANNER } from "../fragments/homeBannerFragment";
export type { OURSERVICES } from "../fragments/homeServicesFragment";
export type { CONTACTUS } from "../fragments/homeContactUsFragment";
export type { Whyaddact } from "../fragments/homeWhyAddactFragment";
export type { GloabeAnimation } from "../fragments/homeGlobeAnimationFragment";
export type { AnimationBanner } from "../fragments/homeAnimationBannerFragment";
export type { LinkWithIcon, OurCapabilitiy } from "../fragments/homeCapabilitiesFragment";
export type { AIEcoSystem } from "../fragments/homeAiEcoSystemFragment";
export type { Industry, IndustryListItem } from "../fragments/industryFragment";
export type { WhoAreWe } from "../fragments/homeWhoAreWeFragment";
export type { OurProcessDetails as OurProcessData } from "../fragments/ourProcessFragment";
export type { CTA } from "../fragments/ctaFragment";
import { HOME_CONTACT_US_FRAGMENT, type CONTACTUS } from "../fragments/homeContactUsFragment";
import { HOME_WHY_ADDACT_FRAGMENT, type Whyaddact } from "../fragments/homeWhyAddactFragment";
import { HOME_GLOBE_ANIMATION_FRAGMENT, type GloabeAnimation } from "../fragments/homeGlobeAnimationFragment";
import { HOME_ANIMATION_BANNER_FRAGMENT, type AnimationBanner } from "../fragments/homeAnimationBannerFragment";
import { HOME_CAPABILITIES_FRAGMENT, type OurCapabilitiy } from "../fragments/homeCapabilitiesFragment";
import { HOME_AI_ECO_SYSTEM_FRAGMENT, type AIEcoSystem } from "../fragments/homeAiEcoSystemFragment";
import { HOME_WHO_ARE_WE_FRAGMENT, type WhoAreWe } from "../fragments/homeWhoAreWeFragment";
import { CTA_FIELDS, type CTA } from "../fragments/ctaFragment";
import { OUR_PROCESS_FIELDS, type OurProcessDetails as OurProcessData } from "../fragments/ourProcessFragment";
import { INDUSTRY_FIELDS, type Industry } from "../fragments/industryFragment";
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
import type { ImageFragmentType as Image } from "../fragments/imageFragment";
import type { LinkFragmentType as Link } from "../fragments/linkFragment";
import type { HeadingFragmentType as Heading } from "../fragments/headingFragment";
import type { FAQ as Faq } from "../fragments/faqFragment";

export type { Image, Link, Heading, Faq };

// Main interface
export interface HomeItems {
  documentId: string;
  PageHeading?: BaseHeading[];
  pageHeading: BaseHeading[];
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
  whoarewe: WhoAreWe;
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
