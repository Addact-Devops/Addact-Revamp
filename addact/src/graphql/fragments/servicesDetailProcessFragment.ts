import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";

export const SERVICES_DETAIL_PROCESS_FIELDS = `
  our_process: ourProcess {
    Title {
      ${BLOG_CONTENT_HEADINGS_FIELDS}
      ... on Error {
        code
        message
      }
    }
    link {
      ...LinkFields
    }
    ProcessData {
      ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
    }
  }
`;
