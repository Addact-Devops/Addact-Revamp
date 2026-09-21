import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { BLOG_CONTENT_ERROR_FIELDS, type ContentError } from "./blogContentErrorFragment";
import type { LinkFragmentType } from "./linkFragment";
import { Heading } from "@/types/common";

export const CHALLENGES_FIELDS = `
  challenges {
    Title {
      ${BLOG_CONTENT_HEADINGS_FIELDS}
      ${BLOG_CONTENT_ERROR_FIELDS}
    }
    ProcessData {
      ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
    }
  }
`;

export type ChallengeError = ContentError;

export type ChallengeProcessDataItem = {
  Title: string;
  Description: string;
  Link?: LinkFragmentType | null;
};

export type Challenges = {
  Title: (Heading | ChallengeError)[];
  ProcessData: ChallengeProcessDataItem[];
};


