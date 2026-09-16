import { gql } from "graphql-request";
import { SEO_FIELDS } from "./seoFragment";
import type { Image, Link } from "@/types/common";
import type { CareerDetailsBannerType } from "./careerDetailsBannerFragment";
import type { CareerDetailsJobDescType } from "./careerDetailsJobDescFragment";
import type { PageHeadingType } from "./pageHeadingFragment";

export const CAREER_DETAIL_ALL_FIELDS_FRAGMENT = gql`
  fragment CareerDetailAllFields on CareerDetail {
    ...CareerDetailsBannerFields
    ...CareerDetailsJobDescFields
    PageHeading {
      PageTitle
      Slug
    }
    Slug
    ReferenceTitle
    ...CareerDetailsFormFields
    SEO {
      ${SEO_FIELDS}
    }
  }
`;

export type CareerDetailResponse = {
  careerDetails: (CareerDetailsBannerType & CareerDetailsJobDescType & {
    PageHeading: PageHeadingType["PageHeading"][];
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
  })[];
};
