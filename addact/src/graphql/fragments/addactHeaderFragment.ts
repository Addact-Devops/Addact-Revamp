export const ADDACT_HEADER_FIELDS = `
  logo {
    ...ImageFields
  }
  contactButton {
    ...HeaderCardFields
  }
  menu(pagination: { limit: -1 }) {
    ...HeaderLayer1Fields
  }
  additionalText
  contactDetails {
    ...LinkFields
  }
`;
