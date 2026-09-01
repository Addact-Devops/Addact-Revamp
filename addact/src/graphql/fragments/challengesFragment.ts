export const CHALLENGES_FIELDS = `
  challenges {
    Title {
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
      ... on Error {
        code
        message
      }
    }
    ProcessData {
      ... on ComponentBaseTemplateTitleWithDescription { ...TitleWithDescriptionFields }
    }
  }
`;
