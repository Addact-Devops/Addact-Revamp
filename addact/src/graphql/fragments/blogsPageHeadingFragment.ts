export const BLOGS_PAGE_HEADING_FIELDS = `
  PageHeading {
    id
    PageTitle
    Slug
  }
`;

export type BlogsPageHeadingType = {
  PageHeading?: {
    id: string;
    PageTitle?: string;
    Slug?: string;
  };
};

