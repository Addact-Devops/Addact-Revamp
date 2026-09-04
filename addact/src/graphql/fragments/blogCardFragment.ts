import { BLOG_HERO_BANNER_FIELDS } from "./blogHeroBannerFieldsFragment";

export const BLOG_CARD_FIELDS = `
  Slug
  documentId
  HeadingSection {
    ... on ComponentBaseTemplateCommonSection { ...CommonSectionFields }
  }
  ${BLOG_HERO_BANNER_FIELDS}
  blog_category {
    Category {
      CategoryTitle
    }
  }
`;
