import { gql } from "graphql-request";

export const HOME_SERVICES_FRAGMENT = gql`
  fragment HomeServicesFields on Home {
    ourservices {
      GlobalCard {
        ... on ComponentBaseTemplatePromo {
          Description
          Image {
            alternativeText
            height
            name
            url
            width
          }
          Link {
            href
            isExternal
            label
            id
            target
          }
          Title
          id
        }
      }
      Title {
        ... on ComponentHeadingsH1 {
          id
          h1
        }
        ... on ComponentHeadingsH2 {
          id
          h2
        }
        ... on ComponentHeadingsH3 {
          id
          h3
        }
        ... on ComponentHeadingsH4 {
          id
          h5
        }
        ... on ComponentHeadingsH5 {
          id
          h5
        }
        ... on ComponentHeadingsH6 {
          id
          h6
        }
      }
      documentId
      pageReference
    }
  }
`;
