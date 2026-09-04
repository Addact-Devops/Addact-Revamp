import { gql } from "graphql-request";
import { SEO_FIELDS } from "./seoFragment";

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
