import { type TitleDescriptionType } from "./titleDescriptionFragment";

export const BLOG_SIMILAR_STORY_TITLE_FIELDS = `
  similarstorytitle {
    CommonTitle {
      ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
    }
  }
`;

export type BlogSimilarStoryTitleItem = TitleDescriptionType;

export type BlogSimilarStoryTitleType = {
  similarstorytitle?: {
    CommonTitle?: BlogSimilarStoryTitleItem[];
  };
};

