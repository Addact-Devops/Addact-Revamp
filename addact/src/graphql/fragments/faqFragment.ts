import { ID_TITLE_DESCRIPTION_FIELDS, type IdTitleDescriptionType } from "./titleDescriptionFragment";

export const FAQ_FIELDS = `
  Title
  FAQ {
    ${ID_TITLE_DESCRIPTION_FIELDS}
  }
`;

export type FAQItem = IdTitleDescriptionType;

export type FAQ = {
  Title: string;
  FAQ: FAQItem[];
};

export type FAQFragmentType = FAQ;
