


import type { ImageFragmentType } from "./imageFragment";
import type { LinkFragmentType } from "./linkFragment";

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

export type IndustryIcon = ImageFragmentType;
export type IndustryLink = LinkFragmentType;

export type Industry = {
  Icons: IndustryIcon | null;
  LinkIcons: IndustryLink[];
  Title: string;
};

