import { gql } from "graphql-request";

export type RichtextFragmentType = {
  id?: string;
  Richtext?: string;
};

export const RICHTEXT_FIELDS = `
  ... on ComponentBaseTemplateRichtext {
    ...RichtextFields
  }
`;

export const RICHTEXT_FRAGMENT = gql`
  fragment RichtextFields on ComponentBaseTemplateRichtext {
    id
    Richtext
  }
`;

