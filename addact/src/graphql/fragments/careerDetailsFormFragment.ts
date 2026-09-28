import { gql } from "graphql-request";

//import { type FormFieldsType } from "./careerFormFieldsFragment";
import { FORM_BASIC_LABELS_FIELDS, type FormBasicLabels } from "./contactUsFormLabelsFragment";
import { COMPONENT_PROMO_FIELDS, type PromoFragmentType } from "./promoFragment";
export type LeftInsightsType = {
  LeftInsights: TitleDescriptionImageType;
};
import {
  TITLE_DESCRIPTION_IMAGE_FIELDS,
  type TitleDescriptionImageType,
} from "./aboutUsBrandValueFragment";
import type { ImageFragmentType } from "./imageFragment";
import type { TitleDescriptionType } from "./titleDescriptionFragment";

export type CareerFormFieldNameType = {
  fieldName: {
    Title: string;
  }[];
};

export type FormPromoType = Partial<PromoFragmentType>;

export type FormFieldsType = {
  FormFields: FormBasicLabels & {
    Form: FormPromoType[];
    GeneralText: string;
  };
};

export type CareersFormType = LeftInsightsType & FormFieldsType & CareerFormFieldNameType;

export type CareerDetailsFormType = {
  careers_form: CareersFormType;
};
export type { TitleDescriptionImageType, TitleDescriptionType, ImageFragmentType };

export const CAREER_DETAILS_FORM_FRAGMENT = gql`
  fragment CareerDetailsFormFields on CareerDetail {
    careers_form {
      LeftInsights {
        ${TITLE_DESCRIPTION_IMAGE_FIELDS}
      }
      FormFields {
        Form {
          ${COMPONENT_PROMO_FIELDS}
        }
        ${FORM_BASIC_LABELS_FIELDS}
        GeneralText
      }
      fieldName {
        Title
      }
    }
  }
`;
