import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { BLOG_CONTENT_ERROR_FIELDS } from "./blogContentErrorFragment";

export const CAREER_CARD_FIELDS = `
  Title {
    ${BLOG_CONTENT_HEADINGS_FIELDS}
    ... on ComponentBaseTemplateRichtext { ...RichtextFields }
    ${BLOG_CONTENT_ERROR_FIELDS}
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
    ${BLOG_CONTENT_ERROR_FIELDS}
  }
`;
