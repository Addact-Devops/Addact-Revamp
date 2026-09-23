import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { BLOG_CONTENT_ERROR_FIELDS, type ContentError } from "./blogContentErrorFragment";
import { COMPONENT_TITLE_WITH_DESCRIPTION_FIELDS } from "./titleWithDescriptionFragment";
import type { TitleDescriptionType } from "./titleDescriptionFragment";
import type { LinkFragmentType } from "./linkFragment";
import type { Heading } from "@/types/common";

export const CHALLENGES_FIELDS = `
  challenges {
    Title {
      ${BLOG_CONTENT_HEADINGS_FIELDS}
      ${BLOG_CONTENT_ERROR_FIELDS}
    }
    ProcessData {
      ${COMPONENT_TITLE_WITH_DESCRIPTION_FIELDS}
    }
  }
`;

export type ChallengeError = ContentError;

export type ChallengeProcessDataItem = Required<TitleDescriptionType> & {
  Link?: LinkFragmentType | null;
};

export type Challenges = {
  Title: (Heading | ChallengeError)[];
  ProcessData: ChallengeProcessDataItem[];
};


