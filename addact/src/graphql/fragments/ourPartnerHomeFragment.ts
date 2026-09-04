import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";

export const OUR_PARTNER_HOME_FIELDS = `
  ourpartner {
    Title {
      ${BLOG_CONTENT_HEADINGS_FIELDS}
    }
    Image {
      ... on ComponentSharedImage { ...SharedImageFields }
    }
  }
`;

