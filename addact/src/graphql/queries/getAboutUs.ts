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
import { CTA_FIELDS, type CTAFragmentType } from "../fragments/ctaFragment";
import type { CommonAuthorType } from "../fragments/blogAuthorFragment";
import {
  ABOUT_US_BRAND_VALUE_FIELDS,
  ABOUT_US_ITEM_INNER_FIELDS,
  type AboutUsItemType,
  type BrandValueType,
  type BrandValueQueryResponse,
} from "../fragments/aboutUsBrandValueFragment";
export type { BrandValueType, BrandValueQueryResponse };
import type { RichTextBlock } from "@/types/common";
import client from "../client";

// -----------------------------
// ✅ Quote Types & Fields
// -----------------------------
export const ABOUT_US_QUOTE_FIELDS = `
  Quote {
    AuthorName
    AuthorImage {
      ...ImageFields
    }
    AuthorMessage
  }
`;
export type AboutUsQuoteType = CommonAuthorType;
export type QuoteData = {
  aboutUs: {
    Quote: AboutUsQuoteType;
  };
};

// -----------------------------
// ✅ Content Types & Fields
// -----------------------------
export const ABOUT_US_CONTENT_FIELDS = `
  AboutUsContent {
    ${ABOUT_US_ITEM_INNER_FIELDS}
  }
`;
export type AboutUsContentType = AboutUsItemType;
export type AboutUsContentData = {
  aboutUs: {
    AboutUsContent: AboutUsContentType;
  };
};

// -----------------------------
// ✅ Vision & Mission Types & Fields
// -----------------------------
export const ABOUT_US_VISION_MISSION_FIELDS = `
  OurVisionMission {
    ${ABOUT_US_ITEM_INNER_FIELDS}
  }
`;
export type ParagraphBlockType = {
  type: "paragraph";
  children: {
    type: string;
    text: string;
  }[];
};
export type VisionMissionItem = Omit<AboutUsItemType, "Description"> & {
  Description: ParagraphBlockType[];
};
export type OurVisionMissionData = {
  aboutUs: {
    OurVisionMission: VisionMissionItem[];
  };
};

// -----------------------------
// ✅ CTA Types & Fields
// -----------------------------
export const ABOUT_US_CTA_FIELDS = `
  aboutUsCTA {
    ${CTA_FIELDS}
  }
`;
export type CTAType = CTAFragmentType;
export type AboutUsCTAResponse = {
  aboutUs: {
    aboutUsCTA: CTAType;
  };
};

// -----------------------------
// ✅ We Are Addact Types & Fields
// -----------------------------
export const ABOUT_US_WE_ARE_ADDACT_FIELDS = `
  WeAreAddact {
    Image {
      ...ImageFields
    }
    SubTitle
    Title
    Content
    NumberContent {
      Number
      Content
    }
  }
`;
export type NumberContent = {
  Number: string;
  Content: string;
};
export type ContentBlock = RichTextBlock;
export type WeAreAddactType = Omit<AboutUsItemType, "Description"> & {
  Content: ContentBlock[];
  NumberContent: NumberContent[];
};

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
