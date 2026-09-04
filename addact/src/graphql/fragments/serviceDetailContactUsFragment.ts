export const SERVICE_DETAIL_CONTACT_US_FIELDS = `
  contact_us {
    Form {
      ... on ComponentBaseTemplatePromo {
        id
        Title
        Description
        Image {
          ...ImageFields
        }
        Link {
          ...LinkFields
        }
      }
    }
    pageReference
    RecipientEmails
  }
`;

