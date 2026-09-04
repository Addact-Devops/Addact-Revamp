import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";

export const SERVICE_LIST_CTA2_FIELDS = `
  cta2 {
    CTADescription
    pageReference
    CTAImage {
      ... on ComponentSharedImage { ...SharedImageFields }
    }
    CTALink {
      ...LinkFields
    }
    Title {
      ${BLOG_CONTENT_HEADINGS_FIELDS}
    }
  }
`;

