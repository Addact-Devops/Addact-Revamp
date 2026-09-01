export const SERVICE_DETAIL_CONTACT_US_FIELDS = `
  contact_us {
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
