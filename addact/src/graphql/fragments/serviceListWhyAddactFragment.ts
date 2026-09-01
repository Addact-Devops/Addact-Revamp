export const SERVICE_LIST_WHY_ADDACT_FIELDS = `
  why_addact {
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
    }
    GlobalCard {
      ... on ComponentBaseTemplatePromo {
        id
        Title
        Description
        Image {
          alternativeText
          height
          name
          url
          width
        }
        Link {
          id
          href
          label
          target
          isExternal
        }
      }
    }
    pageReference
  }
`;
