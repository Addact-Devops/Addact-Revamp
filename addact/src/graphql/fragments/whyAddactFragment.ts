import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";

export const WHY_ADDACT_FIELDS = `
  whyaddact {
    Title {
      ${BLOG_CONTENT_HEADINGS_FIELDS}
    }
    pageReference
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
  }
`;
