export const BLOG_CONTENT_FIELDS = `
  BlogContent {
    ... on ComponentHeadingsH6 {
      id
      h6
    }
    ... on ComponentHeadingsH5 {
      id
      h5
    }
    ... on ComponentHeadingsH4 {
      id
      h5
    }
    ... on ComponentHeadingsH3 {
      id
      h3
    }
    ... on ComponentHeadingsH2 {
      id
      h2
    }
    ... on ComponentHeadingsH1 {
      id
      h1
    }
    ... on ComponentSharedImage { ...SharedImageFields }
    ... on ComponentSharedLink {
      id
      href
      label
      target
      isExternal
    }
    ... on ComponentBaseTemplateRichtext { ...RichtextFields }
    ... on Error {
      code
      message
    }
  }
`;
