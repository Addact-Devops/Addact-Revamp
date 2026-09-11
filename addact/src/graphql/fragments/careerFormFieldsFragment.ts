import { FORM_BASIC_LABELS_FIELDS, type FormBasicLabels } from "./contactUsFormLabelsFragment";
import type { ImageFragmentType } from "./imageFragment";

export type FormPromoType = {
  Title?: string;
  Description?: string;
  Image?: ImageFragmentType;
  Link?: {
    label?: string;
  };
};

export type FormFieldsType = FormBasicLabels & {
  Form?: FormPromoType[];
  GeneralText?: string;
};

export const CAREER_FORM_FIELDS_FIELDS = `
  FormFields {
    Form {
      ... on ComponentBaseTemplatePromo {
        Title
        Description
        Image {
          ...ImageFields
        }
        Link {
          label
        }
      }
    }
    ${FORM_BASIC_LABELS_FIELDS}
    GeneralText
  }
`;



