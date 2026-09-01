export const ABOUT_US_CTA_FIELDS = `
  aboutUsCTA {
    Title {
      ... on ComponentHeadingsH1 {
        h1
      }
      ... on ComponentHeadingsH2 {
        h2
      }
      ... on ComponentHeadingsH3 {
        h3
      }
    }
    CTADescription
    CTAImage {
      ... on ComponentSharedImage { ...SharedImageFields }
    }
    CTALink {
      ... on ComponentSharedLink {
        label
        href
        target
        isExternal
      }
    }
  }
`;
