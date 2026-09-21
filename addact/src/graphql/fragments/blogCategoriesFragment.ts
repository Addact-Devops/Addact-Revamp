import { CATEGORY_INNER_FIELDS, type BlogCategoryItem, type Category } from "./blogCategoryFragment";
export type { BlogCategoryItem, Category };

export const BLOG_CATEGORIES_FIELDS = `
  blogCategories {
    ${CATEGORY_INNER_FIELDS}
  }
`;

export type BlogCategoriesType = {
  blogCategories: BlogCategoryItem[];
};

