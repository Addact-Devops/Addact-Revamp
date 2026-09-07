import { CATEGORY_INNER_FIELDS } from "./blogCategoryFragment";

export const BLOG_CATEGORIES_FIELDS = `
  blogCategories {
    ${CATEGORY_INNER_FIELDS}
  }
`;
