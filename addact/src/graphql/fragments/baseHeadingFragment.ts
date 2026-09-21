import { gql } from "graphql-request";

export const BASE_HEADING_FIELDS = `
  PageTitle
  Slug
`;

export const BASE_HEADING_FRAGMENT = gql`
  fragment BaseHeadingFields on ComponentBaseTemplateBaseHeading {
    ${BASE_HEADING_FIELDS}
  }
`;

export type BaseHeading = {
  PageTitle: string;
  Slug: string;
};

