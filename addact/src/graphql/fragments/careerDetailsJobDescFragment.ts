import { gql } from "graphql-request";
import { HEADING_INLINE_FIELDS } from "./headingFragment";
import { BLOG_CONTENT_SHARED_LINK_FIELDS } from "./blogContentSharedLinkFragment";

export const CAREER_DETAILS_JOB_DESC_FRAGMENT = gql`
  fragment CareerDetailsJobDescFields on CareerDetail {
    JobDescription {
      ${HEADING_INLINE_FIELDS}
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

export type CareerDetailsJobDescItem = {
  id: string;
  Richtext?: string;
  h2?: string;
};

export type CareerDetailsJobDescType = {
  JobDescription: CareerDetailsJobDescItem[];
};
