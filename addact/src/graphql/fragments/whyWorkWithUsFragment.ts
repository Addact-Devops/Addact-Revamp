import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";

export const WHY_WORK_WITH_US_FIELDS = `
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
`;
