import { ID_TITLE_DESCRIPTION_FIELDS } from "./titleDescriptionFragment";

export const FAQ_FIELDS = `
  Title
  FAQ {
    ${ID_TITLE_DESCRIPTION_FIELDS}
  }
`;


export type FAQItem = {
  id?: string;
  Title: string;
  Description: string;
};

export type FAQFragmentType = {
  Title?: string;
  FAQ: FAQItem[];
};
