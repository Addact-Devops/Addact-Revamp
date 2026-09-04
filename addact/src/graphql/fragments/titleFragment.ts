import { gql } from "graphql-request";

export const TITLE_FRAGMENT = gql`
  fragment TitleFields on ComponentBaseTemplateTitle {
    Title
  }
`;
