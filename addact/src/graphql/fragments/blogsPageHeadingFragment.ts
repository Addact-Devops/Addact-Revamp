import type { BaseHeading } from "./pageHeadingFragment";

export const BLOGS_PAGE_HEADING_FIELDS = `
  PageHeading {
    id
    PageTitle
    Slug
  }
`;

export type BlogsPageHeadingType = {
  PageHeading?: Partial<BaseHeading> & {
    id: string;
  };
};
