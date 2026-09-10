import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HERO_BANNER_FRAGMENT } from "../fragments/heroBannerFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import { PAGE_HERO_BANNER_FIELDS } from "../fragments/pageHeroBannerFragment";
import { BRAND_GUIDELINES_CONTENT_FIELDS } from "../fragments/brandGuidelinesContentFragment";
import type { BrandGuidelinesResponse } from "../fragments/brandGuidelinesContentFragment";
export type { BrandGuidelinesResponse } from "../fragments/brandGuidelinesContentFragment";
import { BRAND_GUIDELINES_FORM_FIELDS } from "../fragments/brandGuidelinesFormFragment";
import { BRAND_GUIDELINES_PDF_FIELDS } from "../fragments/brandGuidelinesPdfFragment";
import client from "../client";


const GET_BRAND_GUIDELINES = gql`
  ${LINK_FRAGMENT}
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


export async function getBrandGuidelines(): Promise<BrandGuidelinesResponse> {
  const data = await client.request<BrandGuidelinesResponse>(GET_BRAND_GUIDELINES);
  return data;
}
