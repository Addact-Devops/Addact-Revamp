export const HEADER_LAYER_3_FRAGMENT = `
  fragment HeaderLayer3Fields on ComponentSharedLayer3 {
    id
    link { ...LinkFields }
    card { ...HeaderCardFields }
    isCardShow
    isNavHide
  }
`;
