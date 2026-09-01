import { gql } from "graphql-request";
import { IMAGE_FRAGMENT } from "../fragments/imageFragment";
import { SHARED_IMAGE_FRAGMENT } from "../fragments/sharedImageFragment";
import { RICHTEXT_FRAGMENT } from "../fragments/richtextFragment";
import { CAREER_DETAILS_BANNER_FRAGMENT } from "../fragments/careerDetailsBannerFragment";
import { CAREER_DETAILS_JOB_DESC_FRAGMENT } from "../fragments/careerDetailsJobDescFragment";
import { CAREER_DETAILS_FORM_FRAGMENT } from "../fragments/careerDetailsFormFragment";
import { CAREER_DETAIL_ALL_FIELDS_FRAGMENT } from "../fragments/careerDetailAllFieldsFragment";
import client from "../client";
import { Image, Link } from "@/types/common";

const GET_CAREER_DETAIL = gql`
  ${IMAGE_FRAGMENT}
  ${SHARED_IMAGE_FRAGMENT}
  ${RICHTEXT_FRAGMENT}
  ${CAREER_DETAILS_BANNER_FRAGMENT}
  ${CAREER_DETAILS_JOB_DESC_FRAGMENT}
  ${CAREER_DETAILS_FORM_FRAGMENT}
  ${CAREER_DETAIL_ALL_FIELDS_FRAGMENT}
  query careerDetailBySlug($filters: CareerDetailFiltersInput) {
    careerDetails(filters: $filters) {
      ...CareerDetailAllFields
    }
  }
`;

export interface CareerDetailResponse {
  careerDetails: {
    Banner: {
      BannerDescription: string;
      BannerImage: Image;
      BannerTitle: string;
      show_searchbox: boolean;
      BannerLink: Link;
    }[];
    JobDescription: {
      id: string;
      Richtext?: string;
      h2?: string;
    }[];
    PageHeading: {
      PageTitle: string;
      Slug: string;
    }[];
    Slug: string;
    ReferenceTitle: string;
    careers_form: {
      LeftInsights: {
        Title: string;
        Description: string;
        Image: Image;
      };
      FormFields: {
        Form: {
          Title: string;
          Description: string;
          Image?: Image;
          Link?: Link;
        }[];
        NameLable: string;
        EmailLabel: string;
        PhoneLabel: string;
        GeneralText: string;
        RecipientEmails: string;
        ButtonLabel: string;
      };

      fieldName: {
        Title: string;
      }[];
    };

    SEO: {
      metaTitle: string;
      metaDescription: string;
      ogTitle: string;
      ogDescription: string;
      ogImage: {
        url: string;
      };
      metaRobots: string;
      twitterCardTitle: string;
      canonicalURL: string;
      structuredData: string;
      languageTag: string;
    };
  }[];
}

export async function getCareerDetailsData(slug: string) {
  const data = await client.request<CareerDetailResponse>(GET_CAREER_DETAIL, {
    filters: {
      Slug: {
        eq: `/${slug}`,
      },
    },
  });

  return data;
}
