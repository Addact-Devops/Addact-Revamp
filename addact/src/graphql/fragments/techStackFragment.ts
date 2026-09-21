import { TITLE_DESCRIPTION_LOWER_FIELDS, type TitleDescriptionLowerType } from "./titleDescriptionFragment";
import type { ImageFragmentType } from "./imageFragment";

export const TECH_STACK_FIELDS = `
  ${TITLE_DESCRIPTION_LOWER_FIELDS}
  tab {
    category {
      categoryTitle
    }
    tabContent {
      title
      logo {
        ...ImageFields
      }
    }
  }
`;

export type TabContentLogo = ImageFragmentType;

export type TabContent = {
  title: string;
  logo: TabContentLogo | null;
};

export type Tab = {
  category: {
    categoryTitle: string;
  };
  tabContent: TabContent[];
};

export type TechStack = Required<TitleDescriptionLowerType> & {
  tab: Tab[];
};

export type TechStackType = {
  techStack: TechStack;
};

export type { ImageFragmentType };

