export const BLOG_HERO_BANNER_AUTHOR_FIELDS = `
  author {
    Author {
      AuthorName
    }
  }
`;

export type BannerAuthor = {
  author?: {
    Author?: {
      AuthorName?: string;
    };
  };
};

