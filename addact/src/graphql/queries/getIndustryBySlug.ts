import { FAQ_FIELDS } from "../fragments/faqFragment";
// src/graphql/queries/getIndustryBySlug.ts
import { gql } from "graphql-request";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HEADING_FRAGMENT } from "../fragments/headingFragment";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { CTA_FIELDS } from "../fragments/ctaFragment";
import { TECH_STACK_FIELDS } from "../fragments/techStackFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import { SEO_FIELDS } from "../fragments/seoFragment";
import { INDUSTRY_HERO_BANNER_FIELDS } from "../fragments/industryHeroBannerFragment";
import { OUR_PARTNER_FIELDS } from "../fragments/ourPartnerFragment";
import { OUR_CHALLENGES_FIELDS } from "../fragments/ourChallengesFragment";
import { OUR_SOLUTIONS_FIELDS } from "../fragments/ourSolutionsFragment";
import { GLOBAL_CARD_FIELDS } from "../fragments/globalCardFragment";
import { CLIENT_TESTIMONIAL_FIELDS } from "../fragments/clientTestimonialFragment";
import { CONTACT_US_FIELDS } from "../fragments/contactUsFragment";
import { PROJECT_HIGHLIGHTS_FIELDS } from "../fragments/projectHighlightsFragment";
import client from "../client";
import { Heading, Image } from "./getHomePage";

/**
 * Main detail query — filtered by slug.
 * Now includes `faq`, `ContactUs`, and newly added `ProjectHighlights`.
 */
const GET_INDUSTRY_BY_SLUG = gql`
  ${LINK_FRAGMENT}
  ${HEADING_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${SHARED_IMAGE_FRAGMENT}
  ${RICHTEXT_FRAGMENT}
  query GetIndustryBySlug($slug: String!) {
    industryDetailPages(filters: { Slug: { eq: $slug } }) {
      Slug
      ReferenceTitle

      SEO { ${SEO_FIELDS} }

      ${INDUSTRY_HERO_BANNER_FIELDS}

      ${OUR_PARTNER_FIELDS}

      ${OUR_CHALLENGES_FIELDS}

      ${OUR_SOLUTIONS_FIELDS}

      ${GLOBAL_CARD_FIELDS}

      ${CLIENT_TESTIMONIAL_FIELDS}

      cta { ${CTA_FIELDS} }

      faq { ${FAQ_FIELDS} }

      ${CONTACT_US_FIELDS}

      # ✅ Newly added component block
      ${PROJECT_HIGHLIGHTS_FIELDS}

      techStack { ${TECH_STACK_FIELDS} }
    }
  }
`;

/** Slugs helper for SSG/ISR. */
const GET_INDUSTRY_SLUGS = gql`
  query GetIndustrySlugs {
    industryDetailPages {
      Slug
    }
  }
`;

// -------------------- Types --------------------

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

export type IndustryDetail = {
  Slug: string;
  ReferenceTitle?: string;

  SEO?: {
    metaTitle?: string;
    metaDescription?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: { url?: string } | null;
    metaRobots?: string | null;
    twitterCardTitle?: string | null;
    canonicalURL?: string | null;
    structuredData?: Record<string, unknown> | null;
    languageTag?: string | null;
  } | null;

  HeroBanner?: {
    Banner?: {
      BannerTitle?: string | null;
      BannerDescription?: string | null;
      BannerImage?: {
        url?: string | null;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
      } | null;
      BannerLink?: {
        href?: string | null;
        label?: string | null;
        target?: string | null;
        SubDisc?: string | null;
      } | null;
      isTextAlignCenter: boolean | null;
      isVideo: boolean | null;
      show_searchbox: boolean | null;
      videoLink: string | null;
      BannerLogo: Image | null;
    }[];
  } | null;

  OurPartner?: {
    Title?: Array<
      | { id?: string; h1?: string }
      | { id?: string; h2?: string }
      | { id?: string; h3?: string }
      | { id?: string; h5?: string }
      | { id?: string; h6?: string }
    > | null;
    Image?: { Image?: { url?: string; alternativeText?: string | null } | null }[] | null;
  } | null;

  OurChallenges?: {
    Title?: string | null;
    NumberTitleContent?: { Number?: string; Title?: string; Content?: string }[] | null;
  } | null;

  OurSolutions?: {
    Title?: string | null;
    SolutionsCards?: { Title?: string | null; Description?: string | null }[] | null;
  } | null;

  Tech_Stack?: {
    ExpertiseTitle?: { Title?: string | null }[] | null;
    CMS?: Array<{
      Title?: string | null;
      Links?: {
        label?: string | null;
        target?: string | null;
        href?: string | null;
        SubDisc?: string | null;
        Icon?: {
          url?: string | null;
          height?: number | null;
          alternativeText?: string | null;
          width?: number | null;
        } | null;
      } | null;
      Icons?: {
        url?: string | null;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
      } | null;
      ClassName?: string | null;
    }> | null;
  } | null;

  global_card?: {
    Title?: Array<
      | { id?: string; h1?: string }
      | { id?: string; h2?: string }
      | { id?: string; h3?: string }
      | { id?: string; h5?: string }
      | { id?: string; h6?: string }
      | { id?: string; Richtext?: string }
    > | null;
    GlobalCard?: Array<{
      Title?: string | null;
      Description?: string | null;
      Image?: {
        url?: string | null;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
      } | null;
    }> | null;
  } | null;

  client_testimonial?: {
    Title?: string | null;
    Item?: Array<{
      quote?: unknown;
      author_name?: string | null;
      author_position?: string | null;
      rating?: string | null;
    }> | null;
  } | null;

  cta?: {
    CTADescription?: string | null;
    CTAImage: {
      Image: {
        alternativeText: string | null;
        height: number;
        name: string;
        url: string;
        width: number;
      };
    }[];
    CTALink: {
      href: string;
      id: string;
      isExternal: boolean;
      label: string;
      target: string;
    }[];
    Title: Heading[];
  };

  faq?: {
    ReferenceTitle?: string | null;
    Title?: string | null;
    FAQ?: { Title?: string | null; Description?: string | null }[] | null;
  } | null;

  ContactUs?: {
    pageReference?: string | null;
    Form?: Array<{
      Title?: string | null;
      Description?: string | null;
      Image?: {
        url?: string | null;
        alternativeText?: string | null;
        width?: number | null;
        height?: number | null;
      } | null;
    }> | null;
    NameLable?: string | null;
    CompanyName?: string | null;
    RequirementsLabel?: string | null;
    ButtonLabel?: string | null;
    EmailLabel?: string | null;
    RecipientEmails?: string | null;
  } | null;

  /** ✅ New type for ProjectHighlights */
  ProjectHighlights?: {
    Title?: string | null;
    addact_case_studies?: Array<{
      Slug?: string | null;
      HeroBanner?: Array<{
        BannerTitle?: string | null;
        PublishDate?: string | null;
        BannerImage?: {
          url?: string | null;
          alternativeText?: string | null;
          width?: number | null;
          height?: number | null;
        } | null;
      }> | null;
    }> | null;
  } | null;

  techStack?: TechStack | null;
};

export type IndustryBySlugResponse = {
  industryDetailPages: IndustryDetail[];
};

// -------------------- Fetchers --------------------

export async function getIndustryBySlug(slug: string) {
  const normalized = slug.startsWith("/") ? slug : `/${slug}`;
  const data = await client.request<IndustryBySlugResponse>(GET_INDUSTRY_BY_SLUG, {
    slug: normalized,
  });
  return data.industryDetailPages?.[0] || null;
}

export async function getAllIndustrySlugs() {
  const data = await client.request<{
    industryDetailPages: { Slug: string }[];
  }>(GET_INDUSTRY_SLUGS);
  return (data.industryDetailPages || []).map((i) => i.Slug?.replace(/^\//, "")).filter(Boolean);
}
