import { CONTACT_US_FORM_INNER_FIELDS } from "./contactUsFormFragment";
import { type CONTACTUS, type ContactUsFormItem } from "./homeContactUsFragment";

export type ServiceDetailContactUsItem = Partial<CONTACTUS>;

export type ServiceDetailContactUsType = {
  contact_us?: ServiceDetailContactUsItem;
};

export type { CONTACTUS, ContactUsFormItem };

export const SERVICE_DETAIL_CONTACT_US_FIELDS = `
  contact_us {
    ${CONTACT_US_FORM_INNER_FIELDS}
  }
`;



