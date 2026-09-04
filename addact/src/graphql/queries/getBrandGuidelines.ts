import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { HERO_BANNER_FRAGMENT } from "../fragments/heroBannerFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import { PAGE_HERO_BANNER_FIELDS } from "../fragments/pageHeroBannerFragment";
import { BRAND_GUIDELINES_CONTENT_FIELDS } from "../fragments/brandGuidelinesContentFragment";
import { BRAND_GUIDELINES_FORM_FIELDS } from "../fragments/brandGuidelinesFormFragment";
import { BRAND_GUIDELINES_PDF_FIELDS } from "../fragments/brandGuidelinesPdfFragment";
import client from "../client";
import { Heading, Image } from "@/types/common";

const GET_BRAND_GUIDELINES = gql`
  ${IMAGE_FRAGMENT}
  ${HERO_BANNER_FRAGMENT}
  ${SHARED_IMAGE_FRAGMENT}
  ${RICHTEXT_FRAGMENT}
  query BrandGuideline {
    brandGuideline {
      ReferenceTitle
      Slug
      ${PAGE_HERO_BANNER_FIELDS}
      ${BRAND_GUIDELINES_CONTENT_FIELDS}
      ${BRAND_GUIDELINES_FORM_FIELDS}
      ${BRAND_GUIDELINES_PDF_FIELDS}
    }
  }
`;

export interface BrandGuidelinesResponse {
  brandGuideline: {
    ReferenceTitle: string;
    Slug: string;
    HeroBanner: {
      Banner: {
        BannerTitle: string;
        BannerDescription: string;
        BannerImage: Image;
      }[];
    };
    Content: Heading[];
    FromTitle: string;
    FormFileds: {
      NameLable: string;
      EmailLabel: string;
      PhoneLabel: string;
      RecipientEmails: string;
      ButtonLabel: string;
    };
    GuidelinePDF: {
      alternativeText: string;
      url: string;
    };
  };
}

export async function getBrandGuidelines(): Promise<BrandGuidelinesResponse> {
  const data = await client.request<BrandGuidelinesResponse>(GET_BRAND_GUIDELINES);
  return data;
}
