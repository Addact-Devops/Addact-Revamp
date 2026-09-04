import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";

export const SERVICE_LIST_WHY_ADDACT_FIELDS = `
  why_addact {
    Title {
      ${BLOG_CONTENT_HEADINGS_FIELDS}
    }
    GlobalCard {
      ... on ComponentBaseTemplatePromo {
        id
        Title
        Description
        Image {
          ...ImageFields
        }
        Link {
          ...LinkFields
        }
      }
    }
    pageReference
  }
`;
