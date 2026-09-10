export const BLOG_SIMILAR_STORY_TITLE_FIELDS = `
  similarstorytitle {
    CommonTitle {
      ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
    }
  }
`;

export type BlogSimilarStoryTitleItem = {
  Title?: string;
  Description?: string;
};

export type BlogSimilarStoryTitleType = {
  similarstorytitle?: {
    CommonTitle?: BlogSimilarStoryTitleItem[];
  };
};

