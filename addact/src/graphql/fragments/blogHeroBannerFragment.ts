import { BANNER_TITLE_DESCRIPTION_FIELDS } from "./componentBannerFieldsFragment";

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

