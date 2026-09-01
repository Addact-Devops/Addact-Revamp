export const VIDEO_LIST_FIELDS = `
  VideoList(pagination: { limit: -1 }) {
    Content {
      Title
      Description
      Link {
        isExternal
        href
        label
      }
    }
    Iframe {
      Richtext
    }
  }
`;
