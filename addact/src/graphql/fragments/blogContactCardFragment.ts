import { COMPONENT_CARD_FIELDS, type CardFragmentType } from "./cardFragment";
import { BLOG_CONTENT_ERROR_FIELDS, type ContentError } from "./blogContentErrorFragment";

export const BLOG_CONTACT_CARD_FIELDS = `
  contactCard {
    documentId
    pageReference
    createdAt
    updatedAt
    publishedAt
    ContactCard {
      ${COMPONENT_CARD_FIELDS}
      ${BLOG_CONTENT_ERROR_FIELDS}
    }
  }
`;

export type BlogContactCardItem = CardFragmentType;

export type BlogContactCard = {
  documentId?: string;
  pageReference?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  ContactCard?: BlogContactCardItem[];
};

export type BlogContactCardType = {
  contactCard?: BlogContactCard;
};

export type { CardFragmentType, ContentError };

