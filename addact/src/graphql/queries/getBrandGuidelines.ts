import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { LINK_FRAGMENT } from "../fragments/linkFragment";
import { HERO_BANNER_FRAGMENT } from "../fragments/heroBannerFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import { PAGE_HERO_BANNER_FIELDS, type AboutUsBannerType } from "../fragments/pageHeroBannerFragment";
export type { AboutUsBannerType };
import { BRAND_GUIDELINES_CONTENT_FIELDS, type BrandGuidelinesResponse, type BrandGuidelinesPdfType, type BrandGuidelinesFormFieldsItem } from "../fragments/brandGuidelinesContentFragment";
export type { BrandGuidelinesResponse, BrandGuidelinesPdfType, BrandGuidelinesFormFieldsItem };
import { FORM_BASIC_LABELS_FIELDS } from "../fragments/contactUsFormLabelsFragment";
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
      FromTitle
      FormFileds {
        ${FORM_BASIC_LABELS_FIELDS}
      }
      GuidelinePDF {
        ...ImageFields
      }
    }
  }
`;

export async function getBrandGuidelines(): Promise<BrandGuidelinesResponse> {
  const data = await client.request<BrandGuidelinesResponse>(GET_BRAND_GUIDELINES);
  return data;
}

