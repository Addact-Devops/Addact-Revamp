import { gql } from "graphql-request";
import { SEO_FIELDS, type SeoType } from "./seoFragment";
import { COMPONENT_BANNER_FIELDS, type BannerSection } from "./componentBannerFieldsFragment";
import type { CareerDetailsJobDescType } from "./careerDetailsJobDescFragment";
import { PAGE_HEADING_FIELDS, type PageHeadingType } from "./pageHeadingFragment";
import type { CareerDetailsFormType } from "./careerDetailsFormFragment";
import type { SlugType } from "@/types/common";

export const CAREER_DETAIL_ALL_FIELDS_FRAGMENT = gql`
  fragment CareerDetailAllFields on CareerDetail {
    Banner {
      ${COMPONENT_BANNER_FIELDS}
    }
    ...CareerDetailsJobDescFields
    ${PAGE_HEADING_FIELDS}
    Slug
    ReferenceTitle
    ...CareerDetailsFormFields
    SEO {
      ${SEO_FIELDS}
    }
  }
`;

export type CareerDetailItem = BannerSection &
  CareerDetailsJobDescType &
  CareerDetailsFormType &
  SlugType & {
    PageHeading?: PageHeadingType["PageHeading"][];
    ReferenceTitle?: string;
    SEO?: SeoType;
  };

export type CareerDetailResponse = {
  careerDetails: CareerDetailItem[];
};
