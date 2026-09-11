export const TECH_STACK_FIELDS = `
  title
  description
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

export type TabContentLogo = {
  alternativeText?: string | null;
  height?: number;
  name?: string;
  url: string;
  width?: number;
};

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

export type TechStack = {
  title: string;
  description: string;
  tab: Tab[];
};

export type TechStackType = {
  techStack: TechStack;
};
