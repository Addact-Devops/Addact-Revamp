import { gql } from "graphql-request";
import type { SlugType } from "@/types/common";

export const BASE_HEADING_FIELDS = `
  PageTitle
  Slug
`;

export const BASE_HEADING_FRAGMENT = gql`
  fragment BaseHeadingFields on ComponentBaseTemplateBaseHeading {
    ${BASE_HEADING_FIELDS}
  }
`;

export type BaseHeading = Required<SlugType> & {
  PageTitle: string;
};

