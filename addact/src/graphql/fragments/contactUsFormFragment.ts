
export const CONTACT_US_FORM_FIELDS = `
  contactus {
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
