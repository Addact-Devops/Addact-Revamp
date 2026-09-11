// src/graphql/queries/getAboutUs.ts

import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HERO_BANNER_FRAGMENT } from "../fragments/heroBannerFragment";
import { PAGE_HERO_BANNER_FIELDS } from "../fragments/pageHeroBannerFragment";
import type {
  AboutUsBannerType,
  AboutUsHeroBannerResponse,
} from "../fragments/pageHeroBannerFragment";
export type { AboutUsBannerType, AboutUsHeroBannerResponse };
import { ABOUT_US_QUOTE_FIELDS } from "../fragments/aboutUsQuoteFragment";
import type { QuoteData } from "../fragments/aboutUsQuoteFragment";
export type { QuoteData };
import { ABOUT_US_CONTENT_FIELDS } from "../fragments/aboutUsContentFragment";
import type { AboutUsContentData } from "../fragments/aboutUsContentFragment";
export type { AboutUsContentData };
import { ABOUT_US_VISION_MISSION_FIELDS } from "../fragments/aboutUsVisionMissionFragment";
import type { OurVisionMissionData } from "../fragments/aboutUsVisionMissionFragment";
export type { OurVisionMissionData };
import { ABOUT_US_CTA_FIELDS } from "../fragments/aboutUsCtaFragment";
import type { CTAType, AboutUsCTAResponse } from "../fragments/aboutUsCtaFragment";
export type { CTAType, AboutUsCTAResponse };
import { ABOUT_US_BRAND_VALUE_FIELDS } from "../fragments/aboutUsBrandValueFragment";
import type {
  BrandValueType,
  BrandValueQueryResponse,
} from "../fragments/aboutUsBrandValueFragment";
export type { BrandValueType, BrandValueQueryResponse };
import { ABOUT_US_WE_ARE_ADDACT_FIELDS } from "../fragments/aboutUsWeAreAddactFragment";
import type { WeAreAddactType } from "../fragments/aboutUsWeAreAddactFragment";
export type { WeAreAddactType };
import client from "../client";

// -----------------------------
// ✅ About Us Hero Banner
// -----------------------------

const bannerQuery = gql`
  ${LINK_FRAGMENT}
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

const quoteQuery = gql`
  ${IMAGE_FRAGMENT}
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

const aboutContentQuery = gql`
  ${IMAGE_FRAGMENT}
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

const brandValueQuery = gql`
  ${IMAGE_FRAGMENT}
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
