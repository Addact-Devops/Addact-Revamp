import { gql } from "graphql-request";

export const BASE_HEADING_FRAGMENT = gql`
  fragment BaseHeadingFields on ComponentBaseTemplateBaseHeading {
    PageTitle
    Slug
  }
`;
