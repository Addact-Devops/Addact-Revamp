import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";

export const OUR_PARTNER_FIELDS = `
  OurPartner {
    Title {
      ${BLOG_CONTENT_HEADINGS_FIELDS}
    }
    Image {
      ... on ComponentSharedImage { ...SharedImageFields }
    }
  }
`;

