export const HEADER_LAYER_1_FRAGMENT = `
  fragment HeaderLayer1Fields on ComponentSharedLayer1 {
    id
    link { ...LinkFields }
    card { ...HeaderCardFields }
    subLayers(pagination: { limit: -1 }) {
      ...HeaderLayer2Fields
    }
    isCardShow
    isNavHide
  }
`;
