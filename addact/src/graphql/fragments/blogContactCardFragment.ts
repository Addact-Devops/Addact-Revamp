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
  CardLink?: {
    id?: string;
    href?: string;
    label?: string;
    target?: string;
    isExternal?: boolean;
  };
  BgImage?: {
    width?: number;
    url?: string;
    name?: string;
    height?: number;
    alternativeText?: string;
  };
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

