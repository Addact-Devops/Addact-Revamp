import { CONTACT_US_FORM_LABELS_FIELDS } from "./contactUsFormLabelsFragment";

export const CONTACT_US_FIELDS = `
  ContactUs {
    pageReference
    Form {
      ... on ComponentBaseTemplatePromo {
        Title
        Description
        Image {
          ...ImageFields
        }
      }
    }
    ${CONTACT_US_FORM_LABELS_FIELDS}
  }
`;
