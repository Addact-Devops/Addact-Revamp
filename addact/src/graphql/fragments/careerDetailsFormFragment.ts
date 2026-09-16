import { gql } from "graphql-request";
import { CAREER_FORM_LEFT_INSIGHTS_FIELDS, type LeftInsightsType } from "./careerFormLeftInsightsFragment";
import { CAREER_FORM_FIELDS_FIELDS, type FormFieldsType } from "./careerFormFieldsFragment";
import { CAREER_FORM_FIELD_NAME_FIELDS, type CareerFormFieldNameType } from "./careerFormFieldNameFragment";

export type CareersFormType = LeftInsightsType & FormFieldsType & CareerFormFieldNameType;

export type CareerDetailsFormType = {
  careers_form?: CareersFormType;
};

export const CAREER_DETAILS_FORM_FRAGMENT = gql`
  fragment CareerDetailsFormFields on CareerDetail {
    careers_form {
      ${CAREER_FORM_LEFT_INSIGHTS_FIELDS}
      ${CAREER_FORM_FIELDS_FIELDS}
      ${CAREER_FORM_FIELD_NAME_FIELDS}
    }
  }
`;

