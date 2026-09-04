export const ABOUT_US_CTA_TITLE_FIELDS = `
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
`;
