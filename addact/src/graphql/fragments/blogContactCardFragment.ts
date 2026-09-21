import type { ImageFragmentType } from "./imageFragment";
import type { HeaderLink } from "./linkFragment";

export const BLOG_CONTACT_CARD_FIELDS = `
  contactCard {
    documentId
    pageReference
    createdAt
    updatedAt
    publishedAt
    ContactCard {
      ... on ComponentCardCard { ...CardFields }
      ... on Error {
        code
        message
      }
    }
  }
`;

export type BlogContactCardItem = {
  id?: string;
  CardTitle?: string;
  CardDescription?: string;
  CardLink?: HeaderLink;
  BgImage?: ImageFragmentType;
};

export type BlogContactCardType = {
  contactCard?: {
    documentId?: string;
    pageReference?: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    ContactCard?: BlogContactCardItem[];
  };
};

