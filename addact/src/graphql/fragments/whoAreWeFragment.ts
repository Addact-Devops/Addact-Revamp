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

export type WhoAreWeResponse = {
  whoAreWes: {
    Counter: {
      CounterTitle: string;
      NumberCount: number;
      id: string;
    }[];
    Title: {
      Description: string;
      Title: string;
    }[];
    pageReference: string;
  }[];
};
