export const VIDEO_LIST_FIELDS = `
  VideoList(pagination: { limit: -1 }) {
    Content {
      Title
      Description
      Link {
        ...LinkFields
      }
    }
    Iframe {
      Richtext
    }
  }
`;
