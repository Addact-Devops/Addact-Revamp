import { gql } from "graphql-request";

export const HOME_WHO_ARE_WE_FRAGMENT = gql`
  fragment HomeWhoAreWeFields on Home {
    whoarewe {
      Counter {
        ... on ComponentCounterCounter {
          CounterTitle
          NumberCount
          id
        }
      }
      Title {
        ... on ComponentBaseTemplateTitleWithDescription {
          ...TitleWithDescriptionFields
        }
      }
      pageReference
    }
  }
`;
