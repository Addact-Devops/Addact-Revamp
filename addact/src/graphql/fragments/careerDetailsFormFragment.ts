import { gql } from "graphql-request";
import { CAREER_FORM_LEFT_INSIGHTS_FIELDS } from "./careerFormLeftInsightsFragment";
import { CAREER_FORM_FIELDS_FIELDS } from "./careerFormFieldsFragment";
import { CAREER_FORM_FIELD_NAME_FIELDS } from "./careerFormFieldNameFragment";

export const CAREER_DETAILS_FORM_FRAGMENT = gql`
  fragment CareerDetailsFormFields on CareerDetail {
    careers_form {
      ${CAREER_FORM_LEFT_INSIGHTS_FIELDS}
      ${CAREER_FORM_FIELDS_FIELDS}
      ${CAREER_FORM_FIELD_NAME_FIELDS}
    }
  }
`;
