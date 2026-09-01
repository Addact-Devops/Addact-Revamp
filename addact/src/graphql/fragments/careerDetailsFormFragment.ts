import { gql } from "graphql-request";

export const CAREER_DETAILS_FORM_FRAGMENT = gql`
  fragment CareerDetailsFormFields on CareerDetail {
    careers_form {
      LeftInsights {
        Title
        Description
        Image {
          ...ImageFields
        }
      }
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
      fieldName {
        Title
      }
    }
  }
`;
