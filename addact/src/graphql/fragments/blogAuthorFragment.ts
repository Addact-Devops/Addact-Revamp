export const BLOG_AUTHOR_FIELDS = `
  author {
    Author {
      AuthorName
      AuthorDescription
      AuthorImage {
        alternativeText
        height
        width
        url
        name
      }
      designation {
        DesignationTitle
      }
    }
  }
`;
