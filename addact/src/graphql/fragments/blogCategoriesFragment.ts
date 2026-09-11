import { CATEGORY_INNER_FIELDS } from "./blogCategoryFragment";

export const BLOG_CATEGORIES_FIELDS = `
  blogCategories {
    ${CATEGORY_INNER_FIELDS}
  }
`;

export type BlogCategoryItem = {
  Category: {
    CategoryTitle: string;
  };
};

export type BlogCategoriesType = {
  blogCategories: BlogCategoryItem[];
};

