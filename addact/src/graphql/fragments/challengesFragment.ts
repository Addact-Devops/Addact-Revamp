import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { BLOG_CONTENT_ERROR_FIELDS } from "./blogContentErrorFragment";

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
