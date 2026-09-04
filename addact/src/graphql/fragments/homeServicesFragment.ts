import { gql } from "graphql-request";
import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";

export const HOME_SERVICES_FRAGMENT = gql`
  fragment HomeServicesFields on Home {
    ourservices {
      GlobalCard {
        ... on ComponentBaseTemplatePromo {
          Description
          Image {
            ...ImageFields
          }
          Link {
            ...LinkFields
          }
          Title
          id
        }
      }
      Title {
        ${BLOG_CONTENT_HEADINGS_FIELDS}
      }
      documentId
      pageReference
    }
  }
`;

