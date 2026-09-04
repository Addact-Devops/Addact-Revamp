import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";

export const SERVICE_DETAIL_WHY_ADDACT_FIELDS = `
  why_addact {
    Title {
      ${BLOG_CONTENT_HEADINGS_FIELDS}
      ... on ComponentBaseTemplateRichtext { ...RichtextFields }
      ... on Error {
        code
        message
      }
    }
    GlobalCard {
      ... on ComponentBaseTemplatePromo {
        Description
        Image {
          ...ImageFields
        }
        Title
      }
    }
  }
`;

