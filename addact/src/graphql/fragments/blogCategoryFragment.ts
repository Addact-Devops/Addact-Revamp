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
