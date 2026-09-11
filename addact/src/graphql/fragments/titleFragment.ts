import { gql } from "graphql-request";

export type TitleFragmentType = {
  Title?: string;
};

export const TITLE_FRAGMENT = gql`
  fragment TitleFields on ComponentBaseTemplateTitle {
    Title
  }
`;

