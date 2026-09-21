import { BASE_HEADING_FIELDS, type BaseHeading } from "./baseHeadingFragment";

export const BLOGS_PAGE_HEADING_FIELDS = `
  PageHeading {
    id
    ${BASE_HEADING_FIELDS}
  }
`;

export type BlogsPageHeadingType = {
  PageHeading?: Partial<BaseHeading> & {
    id: string;
  };
};

