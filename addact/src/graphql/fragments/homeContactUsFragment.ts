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
      RecipientEmails
      pageReference
    }
  }
`;
