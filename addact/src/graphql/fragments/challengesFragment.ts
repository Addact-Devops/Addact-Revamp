import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { BLOG_CONTENT_ERROR_FIELDS } from "./blogContentErrorFragment";
import { Heading, Image } from "@/types/common";

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

export type ChallengeError = {
  code: string;
  message: string;
};

export type ChallengeProcessDataItem = {
  Title: string;
  Description: string;
  Link: {
    id: string;
    href: string;
    label: string;
    target: string;
    isExternal: boolean;
    SubDisc: string | null;
    Icon: Image | null;
  } | null;
};

export type Challenges = {
  Title: (Heading | ChallengeError)[];
  ProcessData: ChallengeProcessDataItem[];
};

