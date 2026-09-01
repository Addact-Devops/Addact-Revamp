export const FAQ_FIELDS = `
  Title
  FAQ {
    Description
    Title
    id
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
