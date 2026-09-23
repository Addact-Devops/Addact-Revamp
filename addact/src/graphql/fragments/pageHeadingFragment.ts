import { BASE_HEADING_FIELDS, type BaseHeading } from "./baseHeadingFragment";

export const PAGE_HEADING_FIELDS = `
  PageHeading {
    ${BASE_HEADING_FIELDS}
  }
`;

export type PageHeadingType = {
  PageHeading: Partial<BaseHeading>;
};

