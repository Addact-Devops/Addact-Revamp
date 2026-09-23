import { gql } from "graphql-request";
import type { CounterFragmentType } from "./counterFragment";
import type { TitleDescriptionType } from "./titleDescriptionFragment";

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

export type WhoAreWeCounter = CounterFragmentType;
export type WhoAreWeTitle = Required<TitleDescriptionType>;

export type WhoAreWe = {
  Counter: WhoAreWeCounter[];
  Title: WhoAreWeTitle[];
  pageReference: string;
};

export type HomeWhoAreWeType = {
  whoarewe: WhoAreWe;
};

