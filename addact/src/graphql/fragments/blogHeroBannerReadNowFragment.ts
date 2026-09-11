import { type LinkFragmentType } from "./linkFragment";

export const BLOG_HERO_BANNER_READ_NOW_FIELDS = `
  ReadNow {
    ...LinkFields
  }
`;

export type ReadNow = {
  ReadNow: LinkFragmentType | null;
};
