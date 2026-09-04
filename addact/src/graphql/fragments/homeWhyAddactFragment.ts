import { gql } from "graphql-request";
import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";

export const HOME_WHY_ADDACT_FRAGMENT = gql`
  fragment HomeWhyAddactFields on Home {
    whyaddact {
      Title {
        ${BLOG_CONTENT_HEADINGS_FIELDS}
      }
      pageReference
      GlobalCard {
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
    }
  }
`;

