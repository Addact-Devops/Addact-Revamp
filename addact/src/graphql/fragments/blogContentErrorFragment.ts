export const BLOG_CONTENT_ERROR_FIELDS = `
  ... on Error {
    code
    message
  }
`;


export type ContentError = {
  code: string;
  message: string;
};

