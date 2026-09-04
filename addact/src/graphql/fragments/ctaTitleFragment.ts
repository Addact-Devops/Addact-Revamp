export const CTA_TITLE_FIELDS = `
  Title {
    ... on ComponentHeadingsH1 { ...HeadingFields }
    ... on ComponentHeadingsH2 { ...Heading2Fields }
    ... on ComponentHeadingsH3 { ...Heading3Fields }
    ... on ComponentHeadingsH4 { ...Heading4Fields }
    ... on ComponentHeadingsH5 { ...Heading5Fields }
    ... on ComponentHeadingsH6 { ...Heading6Fields }
  }
`;
