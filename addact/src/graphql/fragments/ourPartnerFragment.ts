import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";

export const OUR_PARTNER_INNER_FIELDS = `
  Title {
    ${BLOG_CONTENT_HEADINGS_FIELDS}
  }
  Image {
    ... on ComponentSharedImage { ...SharedImageFields }
  }
`;

export const OUR_PARTNER_FIELDS = `
  OurPartner {
    ${OUR_PARTNER_INNER_FIELDS}
  }
`;

