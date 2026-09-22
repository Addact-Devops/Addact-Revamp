import type { CounterFragmentType } from "./counterFragment";
import type { TitleDescriptionType } from "./titleDescriptionFragment";

export const WHO_ARE_WE_FIELDS = `
  whoAreWes {
    Counter {
      ... on ComponentCounterCounter {
        CounterTitle
        NumberCount
        id
      }
    }
    Title {
      ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
    }
    pageReference
  }
`;

export type WhoAreWeData = {
  Counter: CounterFragmentType[];
  Title: Required<TitleDescriptionType>[];
  pageReference: string;
};

export type WhoAreWeResponse = {
  whoAreWes: WhoAreWeData[];
};
