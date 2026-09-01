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
