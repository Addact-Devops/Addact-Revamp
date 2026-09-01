export const EVENT_CONTACT_US_CARD_FIELDS = `
  contact_us_card {
    ButtonLabel
    CompanyName
    EmailLabel
    NameLable
    RequirementsLabel
    RecipientEmails
    PhoneLabel
    Form {
      ... on ComponentBaseTemplatePromo {
        Title
        Description
      }
    }
  }
`;
