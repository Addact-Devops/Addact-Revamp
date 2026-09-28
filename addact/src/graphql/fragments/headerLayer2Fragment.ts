import { HEADER_LAYER_COMMON_FIELDS, type HeaderSubLayer2 } from "./headerLayer3Fragment";

export const HEADER_LAYER_2_FRAGMENT = `
  fragment HeaderLayer2Fields on ComponentSharedLayer2 {
    ${HEADER_LAYER_COMMON_FIELDS}
    subLayers(pagination: { limit: -1 }) {
      ...HeaderLayer3Fields
    }
  }
`;

export type HeaderSubLayer = HeaderSubLayer2 & {
  subLayers?: HeaderSubLayer2[];
};

