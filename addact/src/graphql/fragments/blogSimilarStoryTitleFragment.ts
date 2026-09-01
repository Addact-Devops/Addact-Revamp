export const BLOG_SIMILAR_STORY_TITLE_FIELDS = `
  similarstorytitle {
    CommonTitle {
      ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
    }
  }
`;
