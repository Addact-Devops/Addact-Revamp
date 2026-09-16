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

export type WhoAreWeCounter = {
  CounterTitle: string;
  NumberCount: number;
  id: string;
};

export type WhoAreWeTitle = {
  Description: string;
  Title: string;
};

export type WhoAreWe = {
  Counter: WhoAreWeCounter[];
  Title: WhoAreWeTitle[];
  pageReference: string;
};

export type HomeWhoAreWeType = {
  whoarewe: WhoAreWe;
};
