export const CAREER_FORM_FIELDS_FIELDS = `
  FormFields {
    Form {
      ... on ComponentBaseTemplatePromo {
        Title
        Description
        Image {
          ...ImageFields
        }
        Link {
          label
        }
      }
    }
    NameLable
    EmailLabel
    PhoneLabel
    GeneralText
    RecipientEmails
    ButtonLabel
  }
`;
