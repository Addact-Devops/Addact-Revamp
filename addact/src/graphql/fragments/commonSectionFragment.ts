import { gql } from "graphql-request";

export const COMMON_SECTION_FRAGMENT = gql`
  fragment CommonSectionFields on ComponentBaseTemplateCommonSection {
    PageTitle
  }
`;
