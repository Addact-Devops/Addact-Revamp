import type { TitleFragmentType } from "./titleFragment";

export type NumberTitleContentItem = TitleFragmentType & {
  Number?: string;
  Content?: string;
};

export type OurChallengesItem = TitleFragmentType & {
  NumberTitleContent?: NumberTitleContentItem[];
};

export type OurChallengesType = {
  OurChallenges?: OurChallengesItem;
};

export const OUR_CHALLENGES_FIELDS = `
  OurChallenges {
    Title
    NumberTitleContent {
      Number
      Title
      Content
    }
  }
`;
