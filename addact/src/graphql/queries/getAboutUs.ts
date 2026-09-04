// src/graphql/queries/getAboutUs.ts

import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HERO_BANNER_FRAGMENT } from "../fragments/heroBannerFragment";
import { PAGE_HERO_BANNER_FIELDS } from "../fragments/pageHeroBannerFragment";
import { ABOUT_US_QUOTE_FIELDS } from "../fragments/aboutUsQuoteFragment";
import { ABOUT_US_CONTENT_FIELDS } from "../fragments/aboutUsContentFragment";
import { ABOUT_US_VISION_MISSION_FIELDS } from "../fragments/aboutUsVisionMissionFragment";
import { ABOUT_US_CTA_FIELDS } from "../fragments/aboutUsCtaFragment";
import { ABOUT_US_BRAND_VALUE_FIELDS } from "../fragments/aboutUsBrandValueFragment";
import { ABOUT_US_WE_ARE_ADDACT_FIELDS } from "../fragments/aboutUsWeAreAddactFragment";
import client from "../client";

// -----------------------------
// ✅ About Us Hero Banner
// -----------------------------

export type AboutUsBannerType = {
  BannerTitle?: string;
  BannerDescription?: string;
  BannerImage?: {
    url?: string;
    height?: number;
    width?: number;
  } | null;
};

export type AboutUsHeroBannerResponse = {
  aboutUs?: {
    HeroBanner?: {
      Banner?: AboutUsBannerType[];
    };
  };
};

const bannerQuery = gql`
  ${IMAGE_FRAGMENT}
  ${HERO_BANNER_FRAGMENT}
  query AboutUs {
    aboutUs {
      ${PAGE_HERO_BANNER_FIELDS}
    }
  }
`;

export const getAboutUsHeroBanner = async (): Promise<AboutUsBannerType | null> => {
  try {
    const res = await client.request<AboutUsHeroBannerResponse>(bannerQuery);
    return res?.aboutUs?.HeroBanner?.Banner?.[0] || null;
  } catch (error) {
    console.error("Error fetching About Us banner:", error);
    return null;
  }
};

// -----------------------------
// ✅ Quote
// -----------------------------

export type QuoteData = {
  aboutUs: {
    Quote: {
      AuthorName: string;
      AuthorMessage: string;
      AuthorImage: {
        url: string;
        alternativeText: string | null;
      };
    };
  };
};

const quoteQuery = gql`
  query AboutUs {
    aboutUs {
      ${ABOUT_US_QUOTE_FIELDS}
    }
  }
`;

export const getAboutUsQuote = async (): Promise<QuoteData> => {
  const data = await client.request(quoteQuery);
  return data as QuoteData;
};

// -----------------------------
// ✅ About Us Content
// -----------------------------

type ParagraphBlock = {
  type: "paragraph";
  children: {
    type: string;
    text: string;
  }[];
};

export type AboutUsContentData = {
  aboutUs: {
    AboutUsContent: {
      SubTitle: string;
      Title: string;
      Description: string;
      Image: {
        url: string;
        alternativeText?: string | null;
      };
    };
  };
};

const aboutContentQuery = gql`
  query AboutUs {
    aboutUs {
      ${ABOUT_US_CONTENT_FIELDS}
    }
  }
`;

export const getAboutUsContent = async (): Promise<AboutUsContentData> => {
  const data = await client.request(aboutContentQuery);
  return data as AboutUsContentData;
};

// -----------------------------
// ✅ Our Vision & Mission
// -----------------------------

export type VisionMissionItem = {
  SubTitle: string;
  Title: string;
  Description: ParagraphBlock[];
  Image: {
    url: string;
    alternativeText?: string | null;
  };
};

export type OurVisionMissionData = {
  aboutUs: {
    OurVisionMission: VisionMissionItem[];
  };
};

const visionQuery = gql`
  ${IMAGE_FRAGMENT}
  query AboutUs {
    aboutUs {
      ${ABOUT_US_VISION_MISSION_FIELDS}
    }
  }
`;

export const getOurVisionMission = async (): Promise<OurVisionMissionData> => {
  const data = await client.request(visionQuery);
  return data as OurVisionMissionData;
};

// -----------------------------
// ✅ CTA Section
// -----------------------------

export type CTAImageType = {
  url: string;
  alternativeText: string | null;
  width: number | null;
  height: number | null;
};

export type CTALinkType = {
  label: string;
  href: string;
  target: string | null;
  isExternal: boolean;
};

export type CtaTitle = { h1?: string } | { h2?: string } | { h3?: string };

export type DescriptionNode = {
  type: string;
  children: { text: string }[];
};

export type CTAType = {
  Title: CtaTitle[];
  CTADescription: DescriptionNode[];
  CTAImage: { Image: CTAImageType }[];
  CTALink: CTALinkType[];
};

type AboutUsCTAResponse = {
  aboutUs: {
    aboutUsCTA: CTAType;
  };
};

const ctaQuery = gql`
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  query GetAboutUsCTA {
    aboutUs {
      ${ABOUT_US_CTA_FIELDS}
    }
  }
`;

export const getAboutUsCTA = async (): Promise<CTAType | null> => {
  const res = await client.request<AboutUsCTAResponse>(ctaQuery);
  return res?.aboutUs?.aboutUsCTA || null;
};

// -----------------------------
// ✅ Brand Value
// -----------------------------

export type BrandValueType = {
  Title: string;
  SubTitle: string;
  Description: string;
  Image: {
    url: string;
    alternativeText: string | null;
    width: number | null;
    height: number | null;
  };
};

type BrandValueQueryResponse = {
  aboutUs: {
    BrandValue: BrandValueType;
  };
};

const brandValueQuery = gql`
  query AboutUs {
    aboutUs {
      ${ABOUT_US_BRAND_VALUE_FIELDS}
    }
  }
`;

export const getBrandValue = async (): Promise<BrandValueType> => {
  const res = await client.request<BrandValueQueryResponse>(brandValueQuery);
  return res?.aboutUs?.BrandValue;
};

// -----------------------------
// ✅ We Are Addact
// -----------------------------

type ContentChild = {
  text: string;
};

type ContentBlock = {
  type: string;
  children: ContentChild[];
};

export type WeAreAddactType = {
  Image: {
    url: string;
    alternativeText: string | null;
    height: number;
    width: number;
  };
  SubTitle: string;
  Title: string;
  Content: ContentBlock[];
  NumberContent: {
    Number: string;
    Content: string;
  }[];
};

const addactQuery = gql`
  ${IMAGE_FRAGMENT}
  query AboutUs {
    aboutUs {
      ${ABOUT_US_WE_ARE_ADDACT_FIELDS}
    }
  }
`;

export const getWeAreAddact = async (): Promise<WeAreAddactType> => {
  const res = await client.request<{ aboutUs: { WeAreAddact: WeAreAddactType } }>(addactQuery);
  return res?.aboutUs?.WeAreAddact;
};
