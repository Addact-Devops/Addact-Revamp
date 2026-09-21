export const SHARED_FORM_LABELS_FIELDS = `
  NameLable
  EmailLabel
  ButtonLabel
  RecipientEmails
`;

export const FORM_BASIC_LABELS_FIELDS = `
  ${SHARED_FORM_LABELS_FIELDS}
  PhoneLabel
`;

export const CONTACT_US_FORM_LABELS_FIELDS = `
  ${SHARED_FORM_LABELS_FIELDS}
  CompanyName
  RequirementsLabel
`;

export type SharedFormLabels = {
  NameLable?: string;
  EmailLabel?: string;
  ButtonLabel?: string;
  RecipientEmails?: string;
};

export type FormBasicLabels = SharedFormLabels & {
  PhoneLabel?: string;
};

export type ContactUsFormLabels = SharedFormLabels & {
  CompanyName?: string;
  RequirementsLabel?: string;
};



