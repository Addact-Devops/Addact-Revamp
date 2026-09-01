import { gql } from "graphql-request";

export const CAREER_DETAILS_JOB_DESC_FRAGMENT = gql`
  fragment CareerDetailsJobDescFields on CareerDetail {
    JobDescription {
      ... on ComponentHeadingsH6 {
        id
        h6
      }
      ... on ComponentHeadingsH5 {
        id
        h5
      }
      ... on ComponentHeadingsH4 {
        id
        h5
      }
      ... on ComponentHeadingsH3 {
        id
        h3
      }
      ... on ComponentHeadingsH2 {
        id
        h2
      }
      ... on ComponentHeadingsH1 {
        id
        h1
      }
      ... on ComponentBaseTemplateRichtext {
        ...RichtextFields
      }
      ... on ComponentSharedLink {
        id
        href
        label
        target
        isExternal
      }
      ... on ComponentSharedImage {
        ...SharedImageFields
      }
    }
  }
`;
