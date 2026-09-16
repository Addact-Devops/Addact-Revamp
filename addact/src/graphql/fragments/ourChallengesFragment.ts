export type NumberTitleContentItem = {
  Number?: string;
  Title?: string;
  Content?: string;
};

export type OurChallengesItem = {
  Title?: string;
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

