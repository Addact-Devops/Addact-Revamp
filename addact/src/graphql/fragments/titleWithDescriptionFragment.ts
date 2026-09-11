import { gql } from "graphql-request";
import type { LinkFragmentType } from "./linkFragment";

export type TitleWithDescriptionFragmentType = {
  Title?: string;
  Description?: string;
  urlKeyword?: string;
  Link?: LinkFragmentType;
};

export const TITLE_WITH_DESCRIPTION_FRAGMENT = gql`
  fragment TitleWithDescriptionFields on ComponentBaseTemplateTitleWithDescription {
    Title
    Description
    urlKeyword
    Link {
      ...LinkFields
    }
  }
`;

export type ExpertiseTitleItem = {
  Title: string;
  Description: string;
  urlKeyword?: string;
  Link?: LinkFragmentType;
};


