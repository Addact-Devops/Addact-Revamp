export const PRESS_CONTENT_FIELDS = `
  PressContent {
    ... on ComponentSharedLink {
      id
      href
      label
      isExternal
    }
    ... on ComponentSharedImage { ...SharedImageFields }
    ... on ComponentHeadingsH1 {
      id
      h1
    }
    ... on ComponentHeadingsH2 {
      id
      h2
    }
    ... on ComponentHeadingsH3 {
      id
      h3
    }
    ... on ComponentHeadingsH4 {
      id
      h5
    }
    ... on ComponentHeadingsH5 {
      id
      h5
    }
    ... on ComponentHeadingsH6 {
      id
      h6
    }
    ... on ComponentBaseTemplateRichtext { ...RichtextFields }
  }
`;
