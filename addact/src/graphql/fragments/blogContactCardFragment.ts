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
