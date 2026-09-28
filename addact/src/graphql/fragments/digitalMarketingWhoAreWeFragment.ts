import type { CounterFragmentType } from "./counterFragment";
import type { TitleDescriptionType } from "./titleDescriptionFragment";

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

export type CounterItem = CounterFragmentType;
export type TitleWithDescriptionItem = Required<TitleDescriptionType>;

export type DigitalMarketingWhoAreWeData = {
  Counter: CounterItem[];
  Title: TitleWithDescriptionItem[];
  pageReference: string;
};

export type DigitalMarketingWhoAreWeType = {
  whoarewe: DigitalMarketingWhoAreWeData;
};

