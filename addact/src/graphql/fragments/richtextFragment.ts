import { gql } from "graphql-request";

export const RICHTEXT_FRAGMENT = gql`
  fragment RichtextFields on ComponentBaseTemplateRichtext {
    id
    Richtext
  }
`;
