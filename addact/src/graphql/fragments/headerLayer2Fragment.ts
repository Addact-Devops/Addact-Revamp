export const HEADER_LAYER_2_FRAGMENT = `
  fragment HeaderLayer2Fields on ComponentSharedLayer2 {
    id
    link { ...LinkFields }
    card { ...HeaderCardFields }
    subLayers(pagination: { limit: -1 }) {
      ...HeaderLayer3Fields
    }
    isCardShow
    isNavHide
  }
`;
