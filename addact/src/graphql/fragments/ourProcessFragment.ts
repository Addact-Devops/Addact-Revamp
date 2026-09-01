export const OUR_PROCESS_FIELDS = `
  Title {
    ... on ComponentHeadingsH6 { ...Heading6Fields }
    ... on ComponentHeadingsH5 { ...Heading5Fields }
    ... on ComponentHeadingsH4 { ...Heading4Fields }
    ... on ComponentHeadingsH3 { ...Heading3Fields }
    ... on ComponentHeadingsH2 { ...Heading2Fields }
    ... on ComponentHeadingsH1 { ...HeadingFields }
    ... on Error {
      code
      message
    }
  }
  ProcessData {
    ... on ComponentBaseTemplateTitleWithDescription {
      Title
      Description
      Link {
        ...LinkFields
      }
    }
  }
`;
