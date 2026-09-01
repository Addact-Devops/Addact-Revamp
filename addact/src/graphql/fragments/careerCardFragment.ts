export const CAREER_CARD_FIELDS = `
  Title {
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
    ... on Error {
      code
      message
    }
  }
  GlobalCard {
    ... on ComponentBaseTemplatePromo {
      id
      Title
      Description
      Image {
        url
        width
        height
        name
        alternativeText
      }
      Link {
        id
        href
        label
        target
        isExternal
      }
    }
    ... on Error {
      code
      message
    }
  }
`;
