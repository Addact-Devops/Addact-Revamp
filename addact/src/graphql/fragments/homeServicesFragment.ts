import { gql } from "graphql-request";
import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { PROMO_INNER_FIELDS } from "./promoFragment";

export const HOME_SERVICES_FRAGMENT = gql`
  fragment HomeServicesFields on Home {
    ourservices {
      GlobalCard {
        ... on ComponentBaseTemplatePromo {
          ${PROMO_INNER_FIELDS}
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

