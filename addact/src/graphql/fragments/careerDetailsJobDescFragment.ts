import { gql } from "graphql-request";
import { BLOG_CONTENT_HEADINGS_FIELDS } from "./blogContentHeadingsFragment";
import { BLOG_CONTENT_SHARED_LINK_FIELDS } from "./blogContentSharedLinkFragment";

export const CAREER_DETAILS_JOB_DESC_FRAGMENT = gql`
  fragment CareerDetailsJobDescFields on CareerDetail {
    JobDescription {
      ${BLOG_CONTENT_HEADINGS_FIELDS}
      ... on ComponentBaseTemplateRichtext {
        ...RichtextFields
      }
      ${BLOG_CONTENT_SHARED_LINK_FIELDS}
      ... on ComponentSharedImage {
        ...SharedImageFields
      }
    }
  }
`;
