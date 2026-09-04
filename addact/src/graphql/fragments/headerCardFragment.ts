export const HEADER_CARD_FRAGMENT = `
  fragment HeaderCardFields on ComponentSharedCard {
    title
    image { ...ImageFields }
    link { ...LinkFields }
  }
`;
