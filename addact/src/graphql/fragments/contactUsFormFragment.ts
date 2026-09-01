export const CONTACT_US_FORM_FIELDS = `
  contactus {
    Form {
      ... on ComponentBaseTemplatePromo {
        id
        Title
        Description
        Image {
          alternativeText
          height
          name
          url
          width
        }
        Link {
          id
          href
          label
          target
          isExternal
        }
      }
    }
    pageReference
    RecipientEmails
  }
`;
