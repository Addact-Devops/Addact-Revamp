export const GLOBAL_CARD_FIELDS = `
  global_card {
    Title {
      ... on ComponentHeadingsH1 {
        h1
        id
      }
      ... on ComponentHeadingsH2 {
        h2
        id
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
    GlobalCard {
      ... on ComponentBaseTemplatePromo {
        Title
        Description
        Image {
          url
          alternativeText
          width
          height
        }
      }
    }
  }
`;
