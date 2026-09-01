import { gql } from "graphql-request";

export const HEADING_FRAGMENT = gql`
  fragment HeadingFields on ComponentHeadingsH1 {
    h1
    id
  }
  fragment Heading2Fields on ComponentHeadingsH2 {
    h2
    id
  }
  fragment Heading3Fields on ComponentHeadingsH3 {
    h3
    id
  }
  fragment Heading4Fields on ComponentHeadingsH4 {
    h5
    id
  }
  fragment Heading5Fields on ComponentHeadingsH5 {
    h5
    id
  }
  fragment Heading6Fields on ComponentHeadingsH6 {
    h6
    id
  }
`;

export type HeadingFragmentType = {
  id?: string;
  h1?: string;
  h2?: string;
  h3?: string;
  h4?: string;
  h5?: string;
  h6?: string;
};
