export const PAGE_HEADING_FIELDS = `
  PageHeading {
    PageTitle
    Slug
  }
`;

export type PageHeadingType = {
  PageHeading: {
    PageTitle?: string;
    Slug?: string;
  };
};

