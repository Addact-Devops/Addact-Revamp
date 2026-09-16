export const BLOG_CONTENT_ERROR_FIELDS = `
  ... on Error {
    code
    message
  }
`;

// Matches the GQL Error union member shape — used in blog, career, caseStudy and challenges content
export type ContentError = {
  code: string;
  message: string;
};

