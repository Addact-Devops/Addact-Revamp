import { TITLE_DESCRIPTION_LOWER_FIELDS, type TitleDescriptionLowerType } from "./titleDescriptionFragment";
import type { ImageFragmentType } from "./imageFragment";

export const TAB_CONTENT_FIELDS = `
  title
  logo {
    ...ImageFields
  }
`;

export const TECH_STACK_TAB_FIELDS = `
  category {
    categoryTitle
  }
  tabContent {
    ${TAB_CONTENT_FIELDS}
  }
`;

export const TECH_STACK_FIELDS = `
  ${TITLE_DESCRIPTION_LOWER_FIELDS}
  tab {
    ${TECH_STACK_TAB_FIELDS}
  }
`;

export type TabContentLogo = ImageFragmentType;

export type TabContent = Pick<Required<TitleDescriptionLowerType>, "title"> & {
  logo: TabContentLogo | null;
};

export type TabCategory = {
  categoryTitle: string;
};

export type Tab = {
  category: TabCategory;
  tabContent: TabContent[];
};

export type TechStack = Required<TitleDescriptionLowerType> & {
  tab: Tab[];
};

export type TechStackType = {
  techStack: TechStack;
};

export type { ImageFragmentType };


