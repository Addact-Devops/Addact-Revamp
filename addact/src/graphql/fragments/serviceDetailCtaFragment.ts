import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";

export const SERVICE_DETAIL_CTA_FIELDS = `
  CTADescription
  CTAImage {
    ...ImageFields
  }
  CTALink {
    ...LinkFields
  }
  Title {
    ${BLOG_CONTENT_HEADINGS_FIELDS}
  }
`;

