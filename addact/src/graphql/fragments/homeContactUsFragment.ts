import { gql } from "graphql-request";
import { PROMO_INNER_FIELDS } from "./promoFragment";

export const HOME_CONTACT_US_FRAGMENT = gql`
  fragment HomeContactUsFields on Home {
    contactus {
      Form {
        ... on ComponentBaseTemplatePromo {
          ${PROMO_INNER_FIELDS}
        }
      }
      RecipientEmails
      pageReference
    }
  }
`;
