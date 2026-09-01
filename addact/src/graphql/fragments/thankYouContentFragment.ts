export const THANK_YOU_CONTENT_FIELDS = `
  Content {
    ... on ComponentBaseTemplateRichtext { ...RichtextFields }
    ... on ComponentSharedLink {
      id
      href
      label
      target
      isExternal
    }
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
  }
`;
