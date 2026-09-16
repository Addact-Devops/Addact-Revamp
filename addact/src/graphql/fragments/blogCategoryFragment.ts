export const CATEGORY_INNER_FIELDS = `
  Category {
    CategoryTitle
  }
`;

export const BLOG_CATEGORY_FIELDS = `
  blogcategory {
    ${CATEGORY_INNER_FIELDS}
  }
`;

// CategoryTitle shape — reused across blog, case study, and webinar fragments
export type Category = {
  CategoryTitle: string;
};

export type BlogCategoryItem = {
  Category: Category;
};

export type BlogCategory = {
  blogcategory: BlogCategoryItem;
};

