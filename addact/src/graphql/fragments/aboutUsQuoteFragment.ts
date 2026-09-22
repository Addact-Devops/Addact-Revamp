import type { ImageFragmentType } from "./imageFragment";
import { AUTHOR_BASE_FIELDS, type CommonAuthorType } from "./blogAuthorFragment";

export const ABOUT_US_QUOTE_FIELDS = `
  Quote {
    ${AUTHOR_BASE_FIELDS}
    AuthorMessage
  }
`;

export type AboutUsQuoteType = CommonAuthorType;

export type QuoteData = {
  aboutUs: {
    Quote: AboutUsQuoteType;
  };
};

export type { CommonAuthorType, ImageFragmentType };
