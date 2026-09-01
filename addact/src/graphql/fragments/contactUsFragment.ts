export const CONTACT_US_FIELDS = `
  ContactUs {
    pageReference
    Form {
      ... on ComponentBaseTemplatePromo {
        Title
        Description
        Image {
          url
          alternativeText
          width
          height
        }
      }
    }
    NameLable
    CompanyName
    RequirementsLabel
    ButtonLabel
    EmailLabel
    RecipientEmails
  }
`;
