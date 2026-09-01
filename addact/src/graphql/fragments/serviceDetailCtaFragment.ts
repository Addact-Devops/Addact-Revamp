export const SERVICE_DETAIL_CTA_FIELDS = `
  CTADescription
  CTAImage {
    alternativeText
    height
    name
    url
    width
  }
  CTALink {
    id
    href
    label
    isExternal
  }
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
`;
