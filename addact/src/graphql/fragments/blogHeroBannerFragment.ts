import type { ImageFragmentType } from "./imageFragment";
import { BANNER_TITLE_DESCRIPTION_FIELDS, type BannerTitleDescriptionType } from "./componentBannerFieldsFragment";

export const BLOG_HERO_BANNER_INNER_FIELDS = `
  ${BANNER_TITLE_DESCRIPTION_FIELDS}
  PublishDate
  BannerImage {
    ...ImageFields
  }
`;

export const BLOG_HERO_BANNER_FIELDS = `
  HeroBanner {
    ... on ComponentBlogHeroBannerBlogHeroBanner {
      ${BLOG_HERO_BANNER_INNER_FIELDS}
    }
  }
`;

export type BlogHeroBannerItem = BannerTitleDescriptionType & {
  BannerTitle: string;
  BannerImage: ImageFragmentType;
  PublishDate?: string;
};

export type BlogHeroBannerType = {
  HeroBanner: BlogHeroBannerItem[];
};
