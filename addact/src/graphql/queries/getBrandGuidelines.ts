import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { HERO_BANNER_FRAGMENT } from "../fragments/heroBannerFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
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
      HeroBanner {
        Banner {
          ... on ComponentBannerBanner {
            ...HeroBannerFields
          }
        }
      }
      Content {
        ... on ComponentHeadingsH1 {
          id
          h1
        }
        ... on ComponentHeadingsH2 {
          id
          h2
        }
        ... on ComponentHeadingsH3 {
          id
          h3
        }
        ... on ComponentHeadingsH4 {
          id
          h5
        }
        ... on ComponentHeadingsH5 {
          id
          h5
        }
        ... on ComponentHeadingsH6 {
          id
          h6
        }
        ... on ComponentBaseTemplateRichtext { ...RichtextFields }
        ... on ComponentSharedImage { ...SharedImageFields }
        ... on ComponentSharedLink {
          id
          href
          label
          target
          isExternal
        }
      }
      FromTitle
      FormFileds {
        NameLable
        EmailLabel
        PhoneLabel
        RecipientEmails
        ButtonLabel
      }
      GuidelinePDF {
        alternativeText
        url
      }
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
