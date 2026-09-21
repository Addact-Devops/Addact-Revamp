import { gql } from "graphql-request";
import { TITLE_DESCRIPTION_FIELDS, type TitleDescriptionType } from "./titleDescriptionFragment";
import type { LinkFragmentType } from "./linkFragment";

export type TitleWithDescriptionFragmentType = TitleDescriptionType & {
  urlKeyword?: string;
  Link?: LinkFragmentType;
};

export type ExpertiseTitleItem = TitleWithDescriptionFragmentType;

export const TITLE_WITH_DESCRIPTION_INNER_FIELDS = `
  ${TITLE_DESCRIPTION_FIELDS}
  urlKeyword
  Link {
    ...LinkFields
  }
`;

export const TITLE_WITH_DESCRIPTION_FRAGMENT = gql`
  fragment TitleWithDescriptionFields on ComponentBaseTemplateTitleWithDescription {
    ${TITLE_WITH_DESCRIPTION_INNER_FIELDS}
  }
`;






