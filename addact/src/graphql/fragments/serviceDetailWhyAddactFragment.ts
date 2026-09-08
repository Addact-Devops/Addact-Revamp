import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { TITLE_DESCRIPTION_IMAGE_FIELDS } from "./aboutUsBrandValueFragment";

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
        ${TITLE_DESCRIPTION_IMAGE_FIELDS}
      }
    }
  }
`;

