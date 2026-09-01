export const DM_WHO_ARE_WE_FIELDS = `
  whoarewe {
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
