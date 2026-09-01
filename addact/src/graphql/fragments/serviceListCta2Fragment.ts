export const SERVICE_LIST_CTA2_FIELDS = `
  cta2 {
    CTADescription
    pageReference
    CTAImage {
      ... on ComponentSharedImage { ...SharedImageFields }
    }
    CTALink {
      ... on ComponentSharedLink {
        href
        id
        isExternal
        label
        target
      }
    }
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
    }
  }
`;
