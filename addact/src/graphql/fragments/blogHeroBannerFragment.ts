import type { ImageFragmentType } from "./imageFragment";
import {
  BANNER_TITLE_DESCRIPTION_FIELDS,
  BANNER_IMAGE_FIELDS,
  type BannerTitleDescriptionType,
} from "./componentBannerFieldsFragment";

export const BLOG_HERO_BANNER_INNER_FIELDS = `
  ${BANNER_TITLE_DESCRIPTION_FIELDS}
  PublishDate
  ${BANNER_IMAGE_FIELDS}
`;

export const COMPONENT_BLOG_HERO_BANNER_FIELDS = `
  ... on ComponentBlogHeroBannerBlogHeroBanner {
    ${BLOG_HERO_BANNER_INNER_FIELDS}
  }
`;

export const BLOG_HERO_BANNER_FIELDS = `
  HeroBanner {
    ${COMPONENT_BLOG_HERO_BANNER_FIELDS}
  }
`;

export type BlogHeroBannerItem = BannerTitleDescriptionType & {
  BannerImage: ImageFragmentType;
  PublishDate?: string;
};

export type BlogHeroBannerType = {
  HeroBanner: BlogHeroBannerItem[];
};
