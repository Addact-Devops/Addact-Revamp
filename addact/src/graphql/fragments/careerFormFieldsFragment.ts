import { FORM_BASIC_LABELS_FIELDS, type FormBasicLabels } from "./contactUsFormLabelsFragment";
import { COMPONENT_PROMO_FIELDS, type PromoFragmentType } from "./promoFragment";

export type FormPromoType = Partial<PromoFragmentType>;

export type FormFieldsType = {
  FormFields: FormBasicLabels & {
    Form: FormPromoType[];
    GeneralText: string;
  };
};

export const CAREER_FORM_FIELDS_FIELDS = `
  FormFields {
    Form {
      ${COMPONENT_PROMO_FIELDS}
    }
    ${FORM_BASIC_LABELS_FIELDS}
    GeneralText
  }
`;



