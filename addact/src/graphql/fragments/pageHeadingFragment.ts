export const PAGE_HEADING_FIELDS = `
  PageHeading {
    PageTitle
    Slug
  }
`;

import type { SlugType } from "@/types/common";

export type BaseHeading = Required<SlugType> & {
  PageTitle: string;
};

export type PageHeadingType = {
  PageHeading: Partial<BaseHeading>;
};
