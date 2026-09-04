import { gql } from "graphql-request";



export const CARD_FRAGMENT = gql`
  fragment CardFields on ComponentCardCard {
    id
    CardTitle
    CardDescription
    CardLink {
      ...LinkFields
    }
    BgImage {
      ...ImageFields
    }
  }
`;
