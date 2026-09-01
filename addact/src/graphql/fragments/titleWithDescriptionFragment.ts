import { gql } from "graphql-request";


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
