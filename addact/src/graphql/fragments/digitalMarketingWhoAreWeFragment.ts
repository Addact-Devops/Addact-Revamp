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

export type CounterItem = {
  CounterTitle: string;
  NumberCount: number;
  id: string;
};

export type TitleWithDescriptionItem = {
  Description: string;
  Title: string;
};

export type DigitalMarketingWhoAreWeData = {
  Counter: CounterItem[];
  Title: TitleWithDescriptionItem[];
  pageReference: string;
};

export type DigitalMarketingWhoAreWeType = {
  whoarewe: DigitalMarketingWhoAreWeData;
};
