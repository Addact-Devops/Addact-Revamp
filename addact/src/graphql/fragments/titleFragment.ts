import { gql } from "graphql-request";

export type TitleFragmentType = {
  Title?: string;
};

export const COMPONENT_TITLE_FIELDS = `
  ... on ComponentBaseTemplateTitle {
    ...TitleFields
  }
`;

export const TITLE_FRAGMENT = gql`
  fragment TitleFields on ComponentBaseTemplateTitle {
    Title
  }
`;

