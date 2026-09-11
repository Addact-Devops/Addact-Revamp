import type { ImageFragmentType } from "./imageFragment";

export const ABOUT_US_QUOTE_FIELDS = `
  Quote {
    AuthorImage {
      ...ImageFields
    }
    AuthorMessage
    AuthorName
  }
`;

export type AboutUsQuoteType = {
  AuthorName: string;
  AuthorMessage: string;
  AuthorImage: ImageFragmentType & {
    url: string;
    alternativeText: string | null;
  };
};

export type QuoteData = {
  aboutUs: {
    Quote: AboutUsQuoteType;
  };
};
