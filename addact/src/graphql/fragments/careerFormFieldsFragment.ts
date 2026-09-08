import { BANNER_TITLE_DESCRIPTION_FIELDS } from "./componentBannerFieldsFragment";
import { FORM_BASIC_LABELS_FIELDS } from "./contactUsFormLabelsFragment";

export const CAREER_FORM_FIELDS_FIELDS = `
  FormFields {
    Form {
      ... on ComponentBaseTemplatePromo {
        ${BANNER_TITLE_DESCRIPTION_FIELDS}
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


