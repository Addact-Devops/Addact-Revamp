


export const INDUSTRIES_WE_SERVE_LIST_FIELDS = `
  Industries {
    Icons {
      ...ImageFields
    }
    LinkIcons {
      ...LinkFields
    }
    Title
  }
`;

export type IndustryIcon = {
  alternativeText?: string | null;
  height: number;
  name: string;
  url: string;
  width: number;
};

export type IndustryLink = {
  id: string;
  href: string;
  label: string;
  target: string;
  isExternal: boolean;
};

export type Industry = {
  Icons: IndustryIcon | null;
  LinkIcons: IndustryLink[];
  Title: string;
};

