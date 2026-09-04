import { gql } from "graphql-request";

export const HOME_CONTACT_US_FRAGMENT = gql`
  fragment HomeContactUsFields on Home {
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
      RecipientEmails
      pageReference
    }
  }
`;
